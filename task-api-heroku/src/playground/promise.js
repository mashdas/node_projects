require('../db/mongoose')

const Task=require('../models/task')
const User=require('../models/user')

// Task.findByIdAndDelete("60734080fd98fe479099e82e").then((data)=>{
// 	console.log(data)
// 	return Task.countDocuments({completed:false})
// }).then(result=>console.log(result)).catch((err)=>console.log(err))


const updateAgeAndCount=async (id,age)=>{
	const user=await User.findByIdAndUpdate(id,{age})
	const count=await User.countDocuments({age})
	return count
}

updateAgeAndCount("60733d9300d46266c0a9ad5b",22).then((data)=>console.log(data))