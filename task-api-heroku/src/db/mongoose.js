const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useCreateIndex:true})




//const task1=new Task({description:"Put it in a bag",completed:false})
//const user1=new User({name:"Mal EL",age:123,email:"supes@krypton.com",password:"loispass"})

//task1.save().then((res)=>console.log(res)).catch((err)=>console.log("SOMETHING WENT WRONG"))

//user1.save().then((res)=>console.log(res)).catch((err)=>console.log("SOMETHING WENT ERONG"))