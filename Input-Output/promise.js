prom = new Promise((res, rej)=> {
    try{
        
    console.log("before res");
    setTimeout(() => {
        res("Success by Vishal");
    }, 4000);
    }
    catch(e){
        rej("Reject by Vishal");
    }
    console.log("after rej");
})

console.log("Start");
prom.then((res)=>{
    console.log(res);
})
.catch((rej)=> {
    console.log(rej);
})
console.log("End");


// before res
// after rej
// Start
// End
// Success by Vishal
