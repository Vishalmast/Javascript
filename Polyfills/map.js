Array.prototype.map = function(cb, thisArg){
    if (this == null) throw new TypeError("Cannot read property 'map' of null or undefined");
    if (typeof cb !== "function") throw TypeError("callback should be a function");
    let res = [];
    for(let i = 0; i< this.length; i++){
        if (!(i in this)) continue;
        res[i] = cb.call(thisArg, this[i], i, this);
    }
    return res;
}

const arr = [1, 2, 3];
console.log(arr.map((x, i, a) => x * 2)); // [2, 4, 6]
console.log([, 2, 3].map((x) => x)); // [empty, 2, 3]
console.log([1, 2, 3].map.call(null, x => x)); // TypeError
