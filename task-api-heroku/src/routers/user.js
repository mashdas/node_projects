const express=require('express')
const router=new express.Router()
const User=require("../models/user")
const auth=require('../middleware/auth')
const multer=require('multer')
const sharp=require('sharp')
const { sendWelcomeMail,sendExitMail }=require('../emails/account')

router.post('/users',(req,res)=>{

	const user=new User(req.body)
	user.save().then((data)=>{res.send(data)}).catch((err)=>{
		res.status(400)
		res.send(err)})
})

router.get('/users/me',auth ,async (req,res)=>{

	res.send(req.user)
})


router.get('/users/:id',auth,async (req,res)=>{
	const id=req.params.id
	
	const user=await User.findOne({_id:id})
	if(!user){
		return res.status(404).send()
	}
	res.send(user)
})



router.patch('/users/me',auth,async (req,res)=>{
	const updates=Object.keys(req.body)
	const validFields=["name","email","age","password"]

	const isValid=updates.every((update)=>validFields.includes(update))
	if (!isValid){
		return res.send({"Error":"You are trying to update a  field that doesn't exist"})
	}
	try{
	//const mod=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
	//const user=await User.findById(req.params.id)
	updates.forEach((x)=>req.user[x]=req.body[x])
	await req.user.save()
	console.log("MARKO")
	res.send(req.user)
}catch(e){
	res.status(400).send(e)
}
})


router.delete('/users/me',auth,async (req,res)=>{
	try{

		await req.user.remove()
		sendExitMail(req.user.email,req.user.name)
		res.send(req.user)
	}catch(e){
		res.send(e)
	}
})



router.post('/users/login',async (req,res)=>{
	
	try{
		const user=await User.findByCredentials(req.body.email,req.body.password)//custom method incorporated into schema
		const token=await user.generateAuthToken()
		res.send({user,token})
	}catch(e){
		res.status(400).send()
	}
})



router.post('/users/signup',async (req,res)=>{
	
	const user=new User(req.body)
	sendWelcomeMail(req.body.email,req.body.name)
	await user.save()
	
	const token=await user.generateAuthToken()
	
	res.send({user,token})
})


router.post('/users/logout',auth,async (req,res)=>{
	try{
		console.log("123123123123")
		req.user.tokens=req.user.tokens.filter((x)=>x.token!==req.token)
		
		await req.user.save()
		res.send("LOGGED OUT!")
	}catch(e){
		res.send(e)
	}
	
})


router.post('/users/logoutAll',auth,async(req,res)=>{
	try{
		const user=req.user
		req.user.tokens=[]
		await req.user.save()
		res.send("LOGGED OUT OF ALL DEVICES")

	}catch(e){
		res.status(400).send(e)
	}
})


const upload=multer({
	
	limits:{
		fileSize:1000000
	},
	fileFilter(req,file,cb){
		if(!file.originalname.match(/.(jpg|jpeg|png)$/)){
			return cb(new Error("Please upload a jpg or jpeg or png format"))
		}
		cb(undefined,true)
	}
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
	const buffer=await sharp(req.file.buffer).resize({height:250,width:250}).png().toBuffer()
	req.user.avatar=buffer
	await req.user.save()
	res.send()
},(err,req,res,next)=>{
	res.status(400).send({error:err.message})
})


router.delete('/users/me/avatar',auth,async (req,res)=>{
	try{
	req.user.avatar=null
	await req.user.save()
	res.send("DELETED")
	}catch(e){
		res.status(400).send(e)
	}
})


router.get('/users/:id/avatar',async (req,res)=>{
	
	try{
	const user=await User.findById(req.params.id)

	if(!user||!user.avatar){
		throw new Error("Something is askew")
	}
	res.set('Content-Type','image/png')
	res.send(user.avatar)

}catch(e){
	res.status(404).send({error:e})
}
})

module.exports=router