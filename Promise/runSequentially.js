Sequential Promise Execution

Write an async function runSequentially(tasks) that takes an array of functions.
Each function returns a Promise. Run all functions one by one in sequence,
and return an array of results in the same order.

async function runSequentially(tasks) {
  let res = new Array(tasks.length);
  let completed = 0;
      for (let i = 0; i< tasks.length; i++){
          try{
            const result = await tasks[i]();
            res[i] = result;
          } catch(err){
              res[i] = err;       
              
          }
          completed++;
          if (completed === tasks.length) return res;
        }
}

const sleep = (i, delay) => {
    return function(){
        return new Promise((resolve, reject) => {
            resolve(i + "th task done");
        })
    }
}

const errorSleep = (i, delay) =>{
    return function(){
        return new Promise((resolve, reject)=> {
            reject(i + "th task failed");
        })
    }
}

let tasks = [sleep(1, 300), sleep(2, 800), errorSleep(3, 800), sleep(4, 50), sleep(5, 600)];

let res = await runSequentially(tasks)
console.log(res);



Enhancements for future:
 - Track time spent per task (log start and end time)
 - Add retry mechanism for failed tasks
 - Add support for concurrency limit (promise pooling)
 - Add progress tracking via callbacks
 - Export as npm module with test cases
