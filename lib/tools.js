Tools = {
  transform(a, b){
    if(a && b){
      switch(a){
        case 'u':
        case 'U':
        case 'upper':
        case 'Upper':
        case 'uppercase':
        case 'Uppercase':
          return b.toUpperCase()
        case 'l':
        case 'L':
        case 'lower':
        case 'Lower':
        case 'lowercase':
        case 'Lowercase':
          return b.charAt(0).toLowerCase() + b.slice(1)
        case 'c':
        case 'C':
        case 'caps':
        case 'Caps':
        case 'capital':
        case 'Capital':
        case 'capitalize':
        case 'Capitalize':
          return b.charAt(0).toUpperCase() + b.slice(1)
        case 'h':
        case 'H':
        case 'hyphenate':
        case 'Hyphenate':
          return b.replace(' ', '-')
      }
    }
  },
  join(a, ...b){
    if(b[b.length-1].hash){
      b.pop()
    }
    return a == '[]' ? b : b.join(a)
  },
  split(a, b){
    if(a){
      switch(b){
        case 'keys':
          return Object.keys(a)
        case 'keys.length':
          return Object.keys(a).length
        case 'values':
          return Object.values(a)
        case 'entries':
          return Object.entries(a).map((([a,b])=>({key:a, value:b})))
        default:
          return b.includes('length') ? a.split(b.replace('.length', '')).length : a.split(b)
      }
    }
  },
  logic(a, b, c, d){
    try{
      if(a == '!'){
        return !b
      }
      if(b == 'in'){
        return c.includes(a)
      }
      if(b == '?'){
        return a ? c : d
      }
      if(['=', '==', '===', '!=', '!==', '<', '<=', '>', '>=', '+', '-', '*', '/', '%', '&&', '||'].includes(b)){
        return eval(`${typeof a == 'string' ? `'${a}'` : a} ${b} ${typeof c == 'string' ? `'${c}'` : c}`)
      }
    }
    catch(err){
      console.log('LOGIC ERROR', a, b, c, err)
      throw err
    }
  },
  get(a){
    if(a.includes('.')){
      var steps = a.split('.')
      var base = Session.get(steps.shift())
      if(base){
        return steps.reduce((b, c)=>{
          return b && b[c]
        }, base)
      }
    }else{
      return Session.get(a)
    }
  },
  log(...a){
    if(a[a.length-1].hash){
      a.pop()
    }
    console.log(a.length == 1 ? a[0] : a)
  },
  formatTime(time, newFormat, oldFormat){
    if(oldFormat.hash != undefined){
      oldFormat = undefined
    }
    return (time ?  moment(time, oldFormat) : moment()).format(newFormat)
  },
  search(collection, id, part){
    var result
    if(id){
      result = Collections[collection].findOne(id)
    }else{
      result = Collections[collection].find(/*where ? where : */{}, {many:true})
    }
    if(result){
      if(part && typeof part == 'string'){
        var parts = part.split('.')
        if(parts.length > 1){
          return parts.reduce((a,i)=>a[i], result)
        }else{
          return result[part]
        }
      }else{
        return result
      }
    }
  },
  permissions(user, dojo){
    return Object.values(Dojos.findOne(dojo).roles).find(a=>a.name==Meteor.users.findOne(user).dojos[dojo])
  },
  activePrograms(id, translateProjects){
    if(id === undefined){
      id = this._id
    }
    var user = Meteor.users.findOne(id)
    if(!user){
      var dojo = Dojos.findOne(id)
    }
    return (dojo ? Object.entries(dojo.programs).map(([programId, active])=>active ? Programs.findOne(programId) : false) : Object.entries(user.grades).map(([programId, programInfo])=>programInfo.active ? {...Programs.findOne(programId), delimiter:programInfo.delimiter, grades:programInfo.projects} : false)).filter(Boolean)
  },
  currentProject(id, programId, delimiter){
    var user = Meteor.users.findOne(id)
    if(user.grades[programId]){
      var program = Programs.findOne(programId)
      if(delimiter === undefined || delimiter.hash){
        delimiter = user.grades[programId].delimiter
      }
      var currentProject
      var prevStamp = delimiter ? moment.max(Object.values(user.grades[program._id].projects[delimiter-1] || {}).map(a=>moment.max(Object.keys(a.history || {}).map(b=>moment(b, 'MM-DD-YYYY h:mm:ss a'))))).format('MM-DD-YYYY h:mm:ss a') : moment().format('MM-DD-YYYY h:mm:ss a')
      for(var i=0;!currentProject&&i<Object.keys(program.delimiters[delimiter].projects).length;i++){
        var project = program.delimiters[delimiter].projects[i]
        if(Projects.findOne(project).type == 'header'){
          continue
        }
        var grade = user.grades[program._id]?.projects?.[delimiter]?.[project]
        if(!grade){
          currentProject = Projects.findOne(project)
          currentProject.since = prevStamp
          break
        }
        var since = moment.max(Object.keys(grade.history || {}).map(a=>moment(a, 'MM-DD-YYYY h:mm:ss a'))).format('MM-DD-YYYY h:mm:ss a')
        var recentGrade = grade.history?.[since]?.stars
        if(recentGrade < 3){
          currentProject = Projects.findOne(project)
          currentProject.since = since
          prevStamp = since
        }
      }
      if(!currentProject){
        return {name:`Finished ${program.delimiters[delimiter].name}`, finished:true}
      }
      return currentProject
    }
  }
}

if(Meteor.isClient){
  for(var helper in Tools){
    Template.registerHelper(helper, Tools[helper])
  }
}