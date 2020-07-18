const request = require('request');

const forecast= (latitude,longitude,callback)=>{
	const url = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=25cc2d457af57f2b624a99076e252a1f&units=metric";	

	request({url : url,json:true},(error,response) =>{
	if(error){
		callback("weather api is unable to connect ",undefined)
	}else if(response.body.error){
		callback("Unable to find location, Try another search",undefined);
	}
	else{
		callback(undefined,"It is currently " + response.body.main.temp_min + " "+ "degrees out , and the weather is "+ response.body.weather[0].description + " So better to stay at Home ")
	
	}
})

}

module.exports = forecast