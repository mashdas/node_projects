const request=require('request')
const yargs=require('yargs')




yargs.command({
	command:'check',
	builder:{
		location:{
			describe:"location whose weather you want to ceheck",
			demandOption:true,
			type:'string'

		}
	},
	handler:function(argv){
		geo_dude(argv.location,weather)
	}
})


const geo_dude=(location,callback)=>{
	const encData=encodeURIComponent(location)
	let geo_api_key='pk.eyJ1IjoibWFzaGRhczk0IiwiYSI6ImNrbW5pM2VodDBpMTQydnBldXBiM2duankifQ.YUJ2gS2eVTmKg1ijClDCzQ'
	const geo_url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encData+".json?access_token="+geo_api_key
	request({url:geo_url,json:true},(err,res)=>{
		let lat=res.body.features[0].center[1]
		let lng=res.body.features[0].center[0]
		callback(lat,lng,location)
		
	})

}



const weather=(lat,lng,location)=>{
	let api_key="YOUR_API_KEY"
	const url="http://api.weatherstack.com/current?access_key="+api_key+"&query="+String(lat)+','+String(lng)
	request({url:url,josn:true},(err,res)=>{
	if (err){
		console.log("Unable to connect to api_endpoint")
	}else{
		let status=JSON.parse(res.body).current.weather_descriptions[0]
		let feels_like=JSON.parse(res.body).current.feelslike
		let actual_temp=JSON.parse(res.body).current.temperature
		console.log("It is "+status+" in "+location+".The temperature is "+actual_temp+" and it feels like "+feels_like)

	}
})
}




yargs.parse()


