const sgMail=require('@sendgrid/mail')



sgMail.setApiKey(process.env.SEND_GRID_API_KEY)


const sendWelcomeMail=(email,name)=>{
	sgMail.send({
	to:email,
	from:'mashdas94@gmail.com',
	subject:'You chose wisely.This is the way',
	text:`Welcome to the app,${name}.Please let me know how i can improve MY CREAATTIOON,you pompous ass.`
})


}


const sendExitMail=(email,name)=>
{	
	console.log("SENDING EXIT MAIL")
	sgMail.send({
	to:email,
	from:'mashdas94@gmail.com',
	subject:'We are sorry to see you go:(',
	text:`BYE BYE,${name}.Hope you had fun using the app.`
})
}


module.exports={ 
	sendWelcomeMail, 
	sendExitMail }


