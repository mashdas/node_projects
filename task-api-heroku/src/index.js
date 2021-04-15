const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/task')


const app=express()
const router=require('./routers/user')
const taskRouter=require("./routers/task")

const port=process.env.PORT  



app.use((req,res,next)=>{
	console.log(req.method,req.path)
	console.log("ASDASD")
	next()
})

app.use(express.json())
app.use(router)
app.use(taskRouter)






app.listen(port,()=>{
	console.log("Server is up on port"+port)
})

