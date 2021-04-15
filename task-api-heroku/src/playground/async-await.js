const add=(a,b)=>{
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			if(a<0 || b<0){
				return reject("Numbas should be positive")
			}
			resolve(a+b)
		})
	})
}

const doStuff=async()=>{
	const sum=await add(1,2)
	console.log(sum)
	console.log(typeof(sum))
	//this is equivalent to::
	//add(1,2).then((sum)=>console.log(sum))

	//but instead of chaining one promsise after another we can simply do this:
	const sum1=await add(sum,3)
	const sum3=await add(sum1,4)
	return sum3
}

doStuff().then(data=>console.log(data))
//add(1,2).then((sum)=>console.log(typeof(sum)))