Promise Batching

Problem:
Implement a function batchPromises(tasks, batchSize) that accepts:
tasks: An array of functions, each returning a Promise.
batchSize: The maximum number of Promises to run concurrently (in each batch).


async function batchPromises(tasks, batchSize) {
    let countComplete = 0;
    let taskIndex = 0;
    let resArray = new Array(tasks.length);
    return new Promise((resolve, reject) => {
        async function batchPromisesUtil() {
            for (let i = 0; i < batchSize; i++) {
                if (taskIndex + i >= tasks.length) continue;
                const prom = tasks[taskIndex + i]();
                prom.then((res) => {
                    resArray[taskIndex + i] = res;
                    countComplete++;
                    const currentBatchSize = Math.min(batchSize, tasks.length - taskIndex);
                    if (countComplete === currentBatchSize) {
                        countComplete = 0;
                        taskIndex += batchSize;
                        if (taskIndex >= tasks.length) {
                            return resolve(resArray);  // All tasks complete, resolve main promise
                        }
                        batchPromisesUtil(); // Start the next batch
                    }
                }).catch(reject);
            }
        }
        batchPromisesUtil();
    });
}

// Example "sleep" tasks for testing
const sleep = (i, delay) => {
    return function () {
        return new Promise((res, rej) => {
            setTimeout(() => {
                console.log("sleep " + i + " has hit.");
                res(i + " from resolve has hit!");
            }, delay);
        });
    }
}

const tasks = [
    sleep(1, 1000),
    sleep(2, 100),
    sleep(3, 2000),
    sleep(4, 100),
    sleep(5, 100),
    sleep(6, 100)
];

batchPromises(tasks, 3).then((res) => console.log(res))
    .catch((err) => console.log(err));



  =======================
  Enhancements To Explore
  =======================
  
  - Streaming Batches (Async Generator):
        Instead of returning all results at once, yield each batch's results
        as soon as that batch completes (see: async generator/yield*).
  
  - Per-Task Retry Logic:
        Add support for retrying tasks that fail (with exponential backoff or fixed delay).
  
  - Error Aggregation:
        Collect all errors, not just the first (Promise.allSettled-style).
  
  - Progress Reporting:
        Add optional callbacks for progress per batch or per task.
  
  - Cancellation Support:
        Ability to abort remaining tasks in-flight (see: AbortController).
  
  - Support for Task Arguments:
        Allow tasks to accept arguments passed in via a batch manager.
  
 - TypeScript Version:
       Add type annotations and make robust for typed codebases.

 - Unit Tests:
       Add tests (Jest or Mocha) to verify all edge cases and enhancements.

