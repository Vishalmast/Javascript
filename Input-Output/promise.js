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

prom.then((res)=>{
    console.log("Succeded in then");
})
.catch((rej)=> {
    console.log("Rejected in catch");
})


// before res
// after rej
// Succeded in then
