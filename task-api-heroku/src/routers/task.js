const Task=require("../models/task")
const express=require("express")
const taskRouter=new express.Router()
const auth=require('../middleware/auth')

taskRouter.post('/tasks',auth, async (req,res)=>{
	//const task=new Task(req.body)
	//task.save().then((data)=>res.send(data)).catch((err)=>{
	const task=new Task ({...req.body,owner:req.user._id})

	try{
		await task.save()
		res.status(201).send(task)
	}catch(e){
		res.status(400).send(e)
	}
	})

//async-await equivalent

taskRouter.post('/atasks',async (req,res)=>{
	const task=new Task(req.body)
	try{
		await task.save()
		res.status(200).send()
	}catch{
		res.status(400).send()
	}


})


taskRouter.get('/tasks',auth,async (req,res)=>{
	const match={}
	const sort={}

	if(req.query.sort){
		const parts=req.query.sortBy.split(':')
		sort[parts[0]]=parts[1]==="desc"?-1:1
	}
	if(req.query.completed){
	match.completed=req.query.completed.toLowerCase()==="true"
	}
	//Task.find({}).then((data)=>res.send(data)).catch((err)=>res.send(err))
	try{
	//it works..but imma try with populate	
	//const tasks=await Task.find({owner:req.user._id})
	await req.user.populate({path:'tasks',match,
		options:{
			limit:parseInt(req.query.limit),
			skip:parseInt(req.query.skip),
			sort}}).execPopulate()
	res.status(200).send(req.user.tasks)
	}catch(e){
		res.status(400).send(e)
	}
})



taskRouter.get('/tasks/:id',auth,async (req,res)=>{
	const _id=req.params.id
	try{
	const task=await Task.findOne({_id,owner:req.user._id})
	if(!task){
		return res.status(404).send()
	}
	res.send(task)
}catch(e){
	res.status(400).send(e)
}
})








taskRouter.patch('/tasks/:id',auth,async (req,res)=>{
	const allowedFields=['description',"completed"]
	const givenFields=Object.keys(req.body)
	const isValid=givenFields.every((x)=>allowedFields.includes(x))
	if(!isValid){
		return res.status(400).send({error:"Invalid Field"})
	}
	try{
		//const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
		//const task=await Task.findById(req.params.id)
		const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
		
	if(!task){
		return res.status(404).send("NO SUCH USER")
	}
	givenFields.forEach((x)=>task[x]=req.body[x])
	console.log("ASDADDDDDDDDDDDD")
	await task.save()
	res.send(task)
}catch(e){
	res.status(400).send(e)
}

})



taskRouter.delete('/tasks/:id',auth,async (req,res)=>{
	try{
	const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
	res.send(task)
	}catch(e){
		res.send(e)
	}

})


module.exports=taskRouter
 