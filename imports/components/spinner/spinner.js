import './spinner.html'

Spinner = (selector)=>{
  var spinner = $(`#Spinner-${selector}`)
  if(spinner){
    return {
      ...spinner,
      spin(){
        spinner.addClass('fa-spin')
      },
      stop(){
        setTimeout(()=>{
          spinner.removeClass('fa-spin')
        }, 2000)
      }
    }
  }
}