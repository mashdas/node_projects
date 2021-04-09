const form=document.querySelector('form')
const val=document.querySelector('#val')
const messageOne=document.querySelector('#one')
const messageTwo=document.querySelector('#two')
const messageThree=document.querySelector('#three')
const messagefour=document.querySelector('#four')
const messagefive=document.querySelector('#five')

form.addEventListener('submit',e=>{
	e.preventDefault()
	console.log(val.value)
	fetch("http://localhost:3000/weather?address="+val.value).then(response=>{
		response.json().then((data)=>{
			console.log("bla")
			messageOne.textContent="The weather is:"+data.status+ " at "+data.time
			messageTwo.textContent="It is:"+data.actual_temp+" degrees"
			messageThree.textContent="There is"+data.precip+" % chance of precipitation"
			messagefour.textContent="The wind speed is: "+data.wind_speed+"mph"

		})
	})
})