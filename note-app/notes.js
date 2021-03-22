const fs=require('fs')
const chalk=require('chalk')

const getNotes=()=>"Ew ya go guvna"


const addNote=(title,body)=>{
	
	const notes=loadNotes()

	//check for duplicate titles
	var duplicateCheck=notes.filter((x)=>x.title===title)

	if(duplicateCheck.length===0){
			notes.push({
			title:title,
			body:body
		})
		
		saveNotes(notes)
	}else{
		console.log(chalk.red("Note title present"))
	}

	

}

const loadNotes=()=>{
	
	try{
		const dataBuffer=fs.readFileSync('notes.json')
		return JSON.parse(dataBuffer.toString())


	}catch(e){
		return []
	}
}


const saveNotes=(notes)=>{
	
	fs.writeFileSync('notes.json',JSON.stringify(notes))
}



const remove=(title)=>{
	data=loadNotes()
	new_data=data.filter((x)=>x.title!==title)
	if (data.length-new_data.length===1){
		saveNotes(new_data)	
		console.log(chalk.green("Note removed"))
	}else{
		console.log(chalk.red("No such title!!"))
	}
	

}

const listNotes=()=>{
	data=loadNotes()
	data.forEach((x)=>{console.log(x.title)})
}



const readNote=(title)=>{
	data=loadNotes()
	theOne=data.find((x)=>x.title===title)
	if(theOne){
		console.log("Title:",theOne.title)
		console.log("Body:",theOne.body)
	}

}




module.exports={
	getNotes:getNotes,
	addNote:addNote,
	remove:remove,
	listNotes:listNotes,
	readNote:readNote,
}