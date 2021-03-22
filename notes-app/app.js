const notes=require('./notes.js')
const chalk=require('chalk')

let yargs=require('yargs')


yargs.command({
	command:'add',
	describe:'Add a new note',
	builder:{
		title:{
			describe:'Note title',
			demandOption:true,
			type:'string'
		},
		body:{
			describe:'Note body',
			demandOption:true,
			type:'string'
		}
	},
	handler:function(argv){
		notes.addNote(argv.title,argv.body)
	}
})


yargs.command({
	command:'remove',
	describe:'Remove a note..duh',
	builder:{
		title:{
			describe:"Title of the note",
			demandOption:true,
			type:'string'
		}
	},
	handler:function(argv){
		notes.remove(argv.title)
	}
})


yargs.command({
	command:'list',
	describe:'List all notes',
	handler:()=>notes.listNotes()	
})


yargs.command({
	command:'read',
	describe:'read a particular note',
	builder:{
		title:{
			describe:"The title of the Note",
			demandOption:true,
			type:'string'
		}
	},
	handler(argv){
		notes.readNote(argv.title)
	}

})

yargs.parse()