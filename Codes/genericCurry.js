function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...newArgs) {
                return curried.call(this, ...args, ...newArgs);
            }
        }
    }
}

1️⃣ Pure Function Example
function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));      // 6
console.log(curriedAdd(1, 2)(3));      // 6
console.log(curriedAdd(1)(2, 3));      // 6
console.log(curriedAdd(1, 2, 3));      // 6


2️⃣ Method That Uses this Example
const obj = {
    base: 100,
    add(a, b) {
        return this.base + a + b;
    }
};

const curriedAdd = curry(obj.add);

// Use 'call' to set 'this' context
console.log(curriedAdd.call({base: 5}, 1, 2));        // 8   (5 + 1 + 2)
console.log(curriedAdd.call({base: 20}, 3)(7));       // 30  (20 + 3 + 7)
console.log(curriedAdd.call({base: 100}, 10)(20));    // 130 (100 + 10 + 20)

// Without setting 'this', `base` will be undefined
console.log(curriedAdd(1, 2)); // NaN, as `this.base` is undefined



Advance version:

function curry(fn) {
    return function curried(...args) {
        if (args.length === 0) {
            return fn.call(this);
        }
        return function next(...nextArgs) {
            if (nextArgs.length === 0) {
                return fn.call(this, ...args);
            }
            return curried.call(this, ...args, ...nextArgs);
        };
    };
}

1️⃣ Pure Function Example
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
const curriedSum = curry(sum);

curriedSum(1)(2)(3)(); // 6
curriedSum(1, 2, 3)(); // 6

2️⃣ Method That Uses this Example
const obj = {
    factor: 10,
    multiply: curry(function (...nums) {
        return nums.reduce((acc, n) => acc + n, 0) * this.factor;
    }),
};

obj.multiply(1)(2, 3)(); // (1 + 2 + 3) * 10 = 60
