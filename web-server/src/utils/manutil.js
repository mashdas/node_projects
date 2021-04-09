const request=require("request")

const geo_dude=(location,callback)=>{
	const encData=encodeURIComponent(location)
	let geo_api_key='YOUR_API_KEY'
	const geo_url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encData+".json?access_token="+geo_api_key
	console.log("CHECK_1")
	request({url:geo_url,json:true},(err,res)=>{
		let lat=res.body.features[0].center[1]
		let lng=res.body.features[0].center[0]
		console.log(lat,lng)
		callback(undefined,{lat:lat,lng:lng,location:location})
		
	})

}



const weather=(lat,lng,callback)=>{
	let api_key="YOUR_API_KEY"
	const url="http://api.weatherstack.com/current?access_key="+api_key+"&query="+String(lat)+','+String(lng)
	console.log("CHECK_2")
	request({url:url,josn:true},(err,res)=>{
	if (err){
		console.log("Unable to connect to api_endpoint")
	}else{
		console.log(JSON.parse(res.body))
		let status=JSON.parse(res.body).current.weather_descriptions[0]
		let feels_like=JSON.parse(res.body).current.feelslike
		let actual_temp=JSON.parse(res.body).current.temperature
		let time=JSON.parse(res.body).location.localtime
		let wind_speed=JSON.parse(res.body).current.wind_speed
		let precip=JSON.parse(res.body).current.precip
		
		
		callback(undefined,{status:status,feels_like:feels_like,actual_temp:actual_temp,time:time,wind_speed:wind_speed,precip:precip})
		

	}
})
}

module.exports={geo_dude:geo_dude,weather:weather}

