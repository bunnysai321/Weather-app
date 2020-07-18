const request = require('request');


const geocode = (address,callback)=>{
	const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address+".json?access_token=pk.eyJ1IjoiYnVubnlzYWkiLCJhIjoiY2tjbXJjZGh6MDQ0czJ0cnE4cXNhYmxhZSJ9.3I59e9oVeuLMwghADmnBog&limit=1"

	request({url:geocodeUrl,json:true},(error,response)=>{

	if(error){
		callback("geocoding api is unable to connect ",undefined)
	}else if(response.body.features.length === 0){
		callback("Unable to find location,Try another search",undefined);
	}
	else{
		callback(undefined,{
			 latitude :response.body.features[0].center[1],
			 longitude :response.body.features[0].center[0],
			 location : response.body.features[0].place_name
		})
	
	}
	
})
}




module.exports = geocode
