const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Task=require('./task')

const userSchema=mongoose.Schema({name:{type:String,required:true},
	password:{type:String,
				validate(value){
					if(value.length<6 || value.toLowerCase().includes("password")){
						throw new Error("Invalid Password")
					}
				}},
	age:{type:Number,
		validate(value){
			if(value<0){
				throw new Error("Enter a valid age you drongo")
			}
		}},
	email:{type:String,
		unique:true,
		required:true,
		lowercase:true,
		trim:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error("Invalid Email")
			}
		}},
		tokens:[
			{token:{type:String,required:true}}

		],
		avatar:{type:Buffer}},{timestamps:true})

//establishing a virtual relationship between user and it's created tasks...tis a  virtual relation..i.e not 
//stored on db...mongoose is just aware of how the two data are related

userSchema.virtual('tasks',{
	ref:'Task',
	localField:'_id',//refers to the _id @ user
	foreignField:'owner'//refers to the owner field in the Task model
})


//hasihing the password before storing
userSchema.pre('save',async function (next){
	const user=this
	console.log("Before Saving stuff")
	if(user.isModified('password')){
	user.password=await bcrypt.hash(user.password,8)
	 }
	next()
})


//custom method added to schema
userSchema.statics.findByCredentials=async (email,password)=>{
	const user=await User.findOne({ email })

	if(!user){
		throw new Error("Unable to login!!")
	}


	const isMatch=await bcrypt.compare(password,user.password)

	if(!isMatch){
		throw new Error("You someone else")
	}
	return user
}



userSchema.methods.generateAuthToken=async function(){
	const user=this
	const token=await jwt.sign({_id:user._id.toString()},'hasinamsad')
	user.tokens=user.tokens.concat({token})
	await user.save()
	return token
}




userSchema.methods.toJSON=function(){
	const user=this
	const userObject=user.toObject()

	delete userObject.password
	delete userObject.tokens
	delete userObject.avatar

	return userObject
}



//Deleting the associated tasks before deleting the user

userSchema.pre('remove',async function(req,res,next){
	const user=this
	await Task.deleteMany({owner:user._id})
	next
})


const User=mongoose.model("User",userSchema)



module.exports=User