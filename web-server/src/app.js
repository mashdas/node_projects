const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')

const stuff=require('./utils/manutil')
const geocode=stuff.geo_dude
const forecast=stuff.weather
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('/home',(req,res)=>{
	res.render('index',{title:"weather-app",Author:"Moresh"})
})


app.get('/help',(req,res)=>{
	res.render('help',{Author:"not manish"})
})


app.get('/about',(req,res)=>{
	res.render('about',{Author:"not manish"})
})


app.get('/weather',(req,res)=>{

	if (!req.query.address){
		return res.send({error:"Address lagela re baba"})
	}
	
	const loc=req.query.address
	geocode(loc,(error,{lat,lng,location}={})=>{
		if (error){
			return res.send("Something went wrong")
		}
		forecast(lat,lng,(error,forecastData)=>{
			if(error){
				return res.send(error)
			}
			res.send(forecastData)
		})

	})	
	
	


})

app.listen(3000,()=>{
	console.log("Server is up at port 3000")
})