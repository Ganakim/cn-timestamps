import { Template } from 'meteor/templating'
// lib
import '/lib/tools'
import '/lib/collections'
// components
import '/imports/components/form/form'
import '/imports/components/nav/nav'
import '/imports/components/spinner/spinner'
// pages
import './main.html'
import '/imports/pages/home/home'

require('jquery')
require('jquery-ui')
require('bootstrap')
// require('jquery-ui-sortable-npm')
require('chart.js')

Template.body.events({
  'click [dropdown]'(e){
    const target = $(e.target).closest('[dropdown]')
    const dropTarget = $(target.attr('dropdown'))
    if(dropTarget[0]){
      e.stopPropagation()
      $(`[dropdown="true"]:not(${target.attr('dropdown')})`).attr({dropdown: 'false'})
      dropTarget.attr({dropdown: dropTarget.attr('dropdown') == 'true' ? 'false' : 'true'})
      dropTarget.parents('[dropdown="false"]').attr({dropdown: 'true'})
    }
  },
  'click *:not(#Modal):not(#Modal *)'(e){
    if(!($(e.target).is('[dropdown]') || $(e.target).is('[dropdown] *'))){
      $('[dropdown="true"]').attr({dropdown: 'false'})
    }
  },
  'click #Modal .modalAction'(e){
    e.stopPropagation()
    if(this.type == 'cancel'){
      Modal().close()
    }else{
      if(Modal().callback){
        Modal().callback(this.type)
      }
    }
  },
  'click #Modal *'(e){
    e.stopPropagation()
  },
  'click #Modal'(e){
    e.stopPropagation()
    Modal().close()
  }
})

var modalDep = new Tracker.Dependency()
var modal = false

Template.body.helpers({
  modal(){
    modalDep.depend()
    return modal
  }
})

Modal = (form = {}, actions = {}, callback = false)=>{
  if(form.elements){
    modal = {
      form: form,
      actions: actions,
      callback: callback,
      updateElements(newElements){
        modal.form.elements = newElements
        modalDep.changed()
      },
      close(){
        modal = false
        modalDep.changed()
      },
      modalFocus(){
        setTimeout(()=>{
          $('#Modal input:text, #Modal textarea').first().focus()
        })
      }
    }
  }
  modalDep.changed()
  return modal
}

// Session.set('subsLoaded', false)
// var subsloaded = []
// ['Users', 'Dojos', 'Programs', 'Projects', 'Badges'].forEach(a=>Meteor.subscribe(a.toLowerCase(), {
//   onError: function(){console.log(`${a} Error:`, arguments)},
//   onStop: function(){console.log(`${a} Stopped:`, arguments)},
//   onReady: function(){
//     // console.log(`${a} Loaded:`, arguments)
//     subsloaded.push(a)
//     if(Object.keys(Collections).every(a=>subsloaded.includes(a))){
//       Session.set('subsLoaded', true)
//       console.log('Subscriptions Ready!')
//       cnRouter.go(window.location.href)
//     }
//   }
// }))
