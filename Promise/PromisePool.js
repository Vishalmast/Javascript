Implement a function promisePool(tasks, n) that runs a list of async tasks (returning Promises), 
but with at most n tasks running at any time. Once all tasks are complete, it should resolve.

  function promisePool(tasks, n) {
    let queue = [];
    let count = 0;
    let completed = 0;
    
    for (let task of tasks){
        queue.push(task);
    }
    
    return new Promise((resolve, reject)=>{
        function promisePoolUtil(){
            while (count < n && queue.length > 0){
                count++;
                const tempTask = queue.shift();
                const prom = tempTask();
                prom.then(()=>{
                    completed++;
                   count--; 
                   if (completed === tasks.length) resolve();
                   promisePoolUtil();
                });
            }
        }
        promisePoolUtil();
    })
}

const sleep = (i, delay) => {
    return function(){
        return new Promise((res, rej) =>
            setTimeout(()=>{
                console.log(i, " test");
                res();
            }, delay)
        );
        }
    }
    
const tasks = [sleep(1, 500), sleep(2, 1000), sleep(3, 1000), sleep(4, 100)];
promisePool(tasks, 2).then(()=> console.log("success!!!"));



🔧 Recommended Enhancements (Optional)
Add Error Handling
Ensure the pool properly rejects if any task fails.

Avoid Redundant Queue Copy
Use an index (i) to track current task instead of duplicating the tasks array into a separate queue.

Log Active Task Count (Debugging)
Add logs to track how many tasks are running concurrently.

Preserve Task Result Order
If tasks return values, store results in an array maintaining the original task order (e.g., using index-based assignment).

Return All Results
Modify the function to resolve with the array of results once all tasks complete.

Add Timestamped Logs
Include timestamps to help visualize task execution timing.

Add Task Cancellation Support
Optionally expose a way to cancel remaining tasks via a flag or AbortController.

Convert to Async/Await Pattern
Refactor the core loop using async/await to improve readability and modernize the implementation.

Add Retry Logic (Advanced)
Optionally retry failed tasks a limited number of times before rejecting.

Add Timeout per Task (Advanced)
Enforce a maximum execution time per task using Promise.race() and setTimeout.
