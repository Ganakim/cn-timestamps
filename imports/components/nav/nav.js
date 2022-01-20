import './nav.html'

Template.nav.helpers({
  navLinks(){
    return [
      {text: 'Grading', path:'grading'},
      {text: 'Rewards', path:'rewards'},
      {text: 'Settings', path:'settings'},
      {text: 'Stats', path:'stats'},
      {text: 'Inventory', path:'inventory'}
    ]
  }
})

Template.nav.events({
  'click #LogIn'(){
    cnRouter.go('login?redirect=grading')
  },
  'click #LogOut'(){
    Meteor.logout(err=>err ? console.log(err) : cnRouter.go('login?redirect=grading'))
  },
  'click .dojoDropItem'(){
    console.log('updating Dojo')
    Meteor.call('update', 'Users', Meteor.user()._id, {$set:{dojo:this.toString()}}, err=>console.log(err||'Dojo updated'))
    $('#DojoPickDropdown').attr({dropdown: 'false'})
  },
  'click .navLink'(){
    cnRouter.go(this.path)
    $('#NavMiniDropdown').attr('dropdown', 'false')
  },
  'click #UpdatePassword'(){
    Modal(
      {classes:{form:'flex-column'}, elements:[
        {label:'Just a heads up, you can only change your password once without contacting the server admin, so make sure it\'s a good one!'},
        {type:'password', id:'ChangePwd', label:'New Password:'},
        {type:'password', id:'ChangePwdC', label:'Confirm Password:'},
      ]},
      [{type:'confirm', style:'primary', text:'Ok'}, {type:'cancel', style:'secondary', text:'Cancel'}],
      ()=>{
        if($('#ChangePwd').val() && $('#ChangePwdC').val() && $('#ChangePwd').val() == $('#ChangePwdC').val()){
          Accounts.changePassword('password', $('#ChangePwd').val())
          Modal().close()
          Session.set('pwdNeedsUpdate', false)
        }
      })
  }
})