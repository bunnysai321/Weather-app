console.log("This is from server side msg")




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")

weatherForm.addEventListener('submit',(e)=>{
	e.preventDefault()
	const loc = search.value

	message1.textContent = "loading.."
	message2.textContent =" "
	
	// console.log(location)

		fetch("/weather?address=" + loc).then((response)=>{
		response.json().then((data)=>{
			if(	data.error){
				// console.log(data.error)
				message1.textContent = data.error

			}
			else{
				// console.log(data.forecast)
				// console.log(data.location)

				message1.textContent = data.location
				message2.textContent = data.forecast
			}
		})
	})


})