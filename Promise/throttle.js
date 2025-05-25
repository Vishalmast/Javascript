Implement a function throttlePromise(fn, delay) that wraps an async function fn and throttles its execution:
The wrapped function can only call fn once every delay ms.
If additional calls come in during the throttle window:
They should not trigger fn()
They should return a Promise that resolves or rejects with an error like "Throttled" or similar.


function throttlePromise(fn, interval){
    let start=0;
    return function(...args){
        return new Promise((resolve, reject)=>{
            if ((Date.now() - start) < interval){
                return reject(new Error("Throttled"));
            }
            start = Date.now();
            Promise.resolve(fn(...args))
            .then(resolve)
            .catch(reject);
        })    
    }
}


function mockApiCall(str){
    return new Promise((resolve, reject)=>{
        setTimeout(()=> resolve("API called with: " + str), 150);
    })
}


const throttledFetch = throttlePromise(mockApiCall, 1000);
throttledFetch("A").then(console.log).catch(console.error);
throttledFetch("B").then(console.log).catch(console.error);
setTimeout(() => {
  throttledFetch("C").then(console.log).catch(console.error);
}, 1100);



