import './form.html'

Template.form.onCreated(function(){
  if(this.data.onCreated){
    this.data.onCreated()
  }
  if(this.data.events){
    Template.form.events(this.data.events)
    Template.form.onDestroyed(function(){
      if(this.data.events){
        Template.form.__eventMaps.map((a,i)=>{
          if(JSON.stringify(Object.keys(a)) == JSON.stringify(Object.keys(this.data.events))){
            Template.form.__eventMaps.splice(i, 1)
          }
        })
      }
    })
  }
})

Template.form.onRendered(function(){
  if(this.data.onRendered){
    this.data.onRendered()
  }
})

Template.form.helpers({
  notAnOption(){
    return !this.options.map(a=>a.value).includes(this.selected)
  }
})

Template.form.events({
  'submit *'(e){
    e.preventDefault()
    if(Modal().callback){
      Modal().callback(Modal().actions.filter(a=>a.type != 'cancel')[0].type)
    }
  }
})