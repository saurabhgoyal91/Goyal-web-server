console.log('Javascript file loded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('#searchtxt')
const messageone = document.querySelector('#forcast')
const messagetwo = document.querySelector('#location')

weatherForm.addEventListener('submit',(event)=>{
event.preventDefault()
messageone.textContent = 'Loading...'
messagetwo.textContent = ''
const location=search.value
const target = 'http://localhost:3000/weather?address='+location
fetch(target).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageone.textContent =data.error
        }
        else{
            messageone.textContent =data.forecast
            messagetwo.textContent =data.location
        }
    })
})

})