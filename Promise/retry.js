/**
 * Retries a function up to `n` times with a delay between each retry.
 * Works with both synchronous and asynchronous functions.
 *
 * @param {Function} fn - The function to retry. Can be async or sync.
 * @param {number} n - Maximum number of attempts.
 * @param {number} delay - Delay in milliseconds between retries.
 * @returns {Promise<any>} - Resolves with the result of fn() if successful, or the final error.
 */
async function retry(fn, n, delay) {
    let finalError = "";
    const retryUtil = async (remaining) => {
        if (remaining === 0) return finalError;
        try {
            return await fn(); // handles both sync and async errors
        } catch (err) {
            finalError = err;
            console.log("ERROR!\n", err);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(retryUtil(remaining - 1));
                }, delay);
            });
        }
    };
    return await retryUtil(n);
}

// Example usage:
function test() {
    return "testing";
}

let i = 0;
async function testRetry() {
    i++;
    if (i <= 3) throw Error("Manual error thrown for the " + i + "th time!");
    else return test();
}

retry(testRetry, 5, 1000).then((res) => console.log(res));
