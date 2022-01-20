const subs = ['Users', 'Dojos', 'Programs', 'Projects', 'Badges'].map(a=>Meteor.subscribe(a.toLowerCase(), {
  // onReady: function(){console.log(`${a} Loaded:`, arguments)},
  onError: function(){console.log(`${a} Error:`, arguments)},
  onStop: function(){console.log(`${a} Stopped:`, arguments)}
}))

FlowRouter.route('/:page', {
  action(params, queryParams){
    waitForSubs(params, ()=>{
      Session.set('page', {path: params.page, data:queryParams})
    })
  }
})

FlowRouter.route('/:page/:tab', {
  action(params, queryParams){
    waitForSubs(params, ()=>{
      switch(params.page){
        case 'settings':
          Session.set('settingsTabChanges', {})
          Session.set('page', {path: 'settings', tab:params.tab, data:queryParams})
        break;
        case 'grading':
          var program = Object.entries(Meteor.users.findOne(params.tab).grades).filter(([id, program])=>program.active)[0]
          Session.set('page', {path: 'grading', user:params.tab, program:program[0], delimiter:program[1].delimiter, data:queryParams})
          setTimeout(()=>{
            window.history.replaceState(null, '', `/grading/${params.tab}/${program[0]}/${program[1].delimiter}`)
          })
        break;
      }
    })
  }
})

FlowRouter.route('/:page/:tab/:id', {
  action(params, queryParams){
    waitForSubs(params, ()=>{
      Session.set('settingsTabChanges', {})
      Session.set('page', {path: 'settings', tab:params.tab, id:params.id, data:queryParams})
    })
  }
})

FlowRouter.route('/:page/:userId/:programId/:delimiter', {
  action(params, queryParams){
    waitForSubs(params, ()=>{
      Session.set('page', {path: 'grading', user:params.userId, program:params.programId, delimiter:params.delimiter, data:queryParams})
    })
  }
})

FlowRouter.notFound = {
  action(params, queryParams) {
    Session.set('page', false)
    FlowRouter.go('/grading')
  }
}

function waitForSubs(params, callback){
  Session.set('page', false)
  if(subs?.every(a=>a.ready()) && (!Meteor.user() || Object.keys(Meteor.user()).length > 2)){
    if(checkPermissions(params)){
      if(Session.get('pwdNeedsUpdate') === undefined){
        Accounts.changePassword('password', 'password', err=>{
          Session.set('pwdNeedsUpdate', !err)
        })
      }
      callback()
    }else{
      FlowRouter.go(`/login?redirect=${params.tab ? `settings/${params.tab}` : params.page == 'login' ? 'grading' : params.page}`)
    }
  }else{
    setTimeout(()=>{waitForSubs(...arguments)})
  }
}

function checkPermissions(params){
  var route = [
    params.page,
    (params.page == 'settings' ? params.tab : false) || (params.page == 'grading' ? params.userId : false),
    (params.page == 'settings' ? params.id : false) || (params.page == 'grading' ? params.programId : false),
    params.delimiter
  ].filter(Boolean).join('/')
  var permissions = Meteor.user() ? (Tools.permissions(Meteor.user()._id, Meteor.user().dojo)?.routes || []) : []
  // console.log('ROUTE:', route)
  switch(params.page){
    case 'login':
    case '403':
      return true
    case 'settings':
      return params.tab ? permissions.includes(`/settings/${params.tab}`) : permissions.some(p=>p.includes('/settings/'))
    case 'grading':
      return permissions.includes(`/grading`) && (params.userId && params.programId && params.delimiter ? Meteor.users.findOne(params.userId)?.grades?.[params.programId] : true)
    default:
      return permissions.includes(`/${route}`)
  }
}