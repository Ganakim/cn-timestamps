import './home.html'

Template.home.onCreated(()=>{
  if(Session.get('d') && Session.get('u') && Session.get('p')){
    getTimestamps()
    Session.set('needsLogin', false)
    Session.set('loading', true)
  }else{
    Session.set('needsLogin', true)
  }
  Session.set('loginErrors', '')
})

Template.home.helpers({
  timeSince(time){
    let d = moment().diff(moment(this.value), 'days')
    if(d > 14){
      return 'Over 2 weeks ago'
    }else if (d > 7){
      return 'Over a week ago'
    }else if(d == 1){
      return 'Submitted Yesterday'
    }else if(d === 0){
      return 'Submitted Today'
    }else{
      return `${d} days ago`
    }
  },
  sinceColor(time){
    let d = moment().diff(moment(this.value), 'days')
    if(d > 14){
      return 'bg-danger text-light'
    }else if (d > 7){
      return 'bg-warning'
    }else{
      return `bg-success text-light`
    }
  }
})



Template.home.events({
  'click #GetTimestamps'(e){
    if($('#D').val() && $('#U').val() && $('#P').val()){
      Session.set('d', $('#D').val())
      Session.set('u', $('#U').val())
      Session.set('p', $('#P').val())
      getTimestamps()
      Session.set('needsLogin', false)
      Session.set('loading', true)
    }
  },
  'keyup #U, keyup #P'(e){
    if(e.keyCode == 13){
      Session.set('d', $('#D').val())
      Session.set('u', $('#U').val())
      Session.set('p', $('#P').val())
      getTimestamps()
      Session.set('needsLogin', false)
      Session.set('loading', true)
    }
  },
  'input #TimestampSearch'(e){
    $('.fam').each((i, a)=>{
      let fam = $(a)
      fam.children('.kid').each((j, b)=>{
        let kid = $(b)
        let visible = e.target.value.trim().toLowerCase().split(' ').some(c=>kid.attr('keys').toLowerCase().includes(c))
        kid.toggleClass('hidden', !visible)
      })
      fam.toggleClass('hidden', fam.find('.kid').toArray().every(b=>$(b).hasClass('hidden')))
    })
  },
  'click #Refresh'(e){
    getTimestamps()
    Session.set('loading', true)
  }
})

function getTimestamps(){
  callWithPromise('fetchStudentTimestamps', Session.get('d'), Session.get('u'), Session.get('p'))
  .then(res=>{
    let names = {}
    Session.set('loading', false)
    testText = res
    res.split('\n').filter(a=>!['  ', '\tPlay & Grade', 'Not Graded'].includes(a)).map(a=>{
      let parts = a.split('\t')
      return {
        fName: parts[0].split(' ')[0],
        lName: parts[0].split(' ').slice(1).join(' '),
        timestamp: parts[3]
      }
    }).forEach(grade=>{
      if(!names[grade.lName]){
        names[grade.lName] = {[grade.fName]:moment(grade.timestamp, 'M/D/YYYY').valueOf()}
      }else if(!names[grade.lName][grade.fName]){
        names[grade.lName][grade.fName] = moment(grade.timestamp, 'M/D/YYYY').valueOf()
      }else if(moment(grade.timestamp, 'M/D/YYYY').isAfter(names[grade.lName][grade.fName])){
        names[grade.lName][grade.fName] = moment(grade.timestamp, 'M/D/YYYY').valueOf()
      }
    })
    Session.set('Grades', names)
  })
  .catch(err=>{
    console.log(err)
    Session.set('loading', false)
    Session.set('needsLogin', true)
    Session.set('loginErrors', err.message)
  })
}

const callWithPromise = (method, ...myParameters)=>new Promise((resolve, reject)=>{
  Meteor.call(method, ...myParameters, (err, res)=>{
    if (err) reject(err)
    resolve(res)
  })
})
