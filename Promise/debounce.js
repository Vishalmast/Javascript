Implement a function debouncePromise(fn, delay) that returns a debounced version of an async function fn.

If the debounced function is called multiple times within delay ms, only the last invocation should actually call fn.
The returned function should return a Promise that:
Resolves with the result of the last fn() call
Rejects all earlier calls (if any)


function debouncePromise(fn, delay){
    let id;
    let prevReject;
    return function(...args){
        if (id){
            clearTimeout(id);
        }
        if (prevReject){
            prevReject(new Error("Error: Debounced"));
        }
        return new Promise((resolve, reject)=>{
            prevReject = reject;
            id = setTimeout(()=>{
                resolve(fn(...args));
            }, delay);
            
        });
    }
}


function mockApiCall(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API called with: ${value}`);
            resolve(`result-${value}`);
        }, 100); 
    });
}

const fetchData = debouncePromise(mockApiCall, 300);

fetchData("v1").then(console.log).catch(console.error);
setTimeout(() => fetchData("v2").then(console.log).catch(console.error), 100);
setTimeout(() => fetchData("v3").then(console.log).catch(console.error), 200);
setTimeout(() => fetchData("v4").then(console.log).catch(console.error), 400);


// Error: Debounced
// Error: Debounced
// Error: Debounced
// API called with: v4
// result-v4






