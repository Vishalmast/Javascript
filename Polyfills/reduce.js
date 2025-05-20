Array.prototype.reduce = function(cb, acc, thisArg){
    
    if (typeof cb !== "function") throw TypeError("Cb is not a fn");
    let i =0;
    let flag = false;
    if (arguments.length === 1){
        for (i = 0; i< this.length; i++){
            if (!(i in this)) continue;
            acc = this[i];
            i++;
            flag=true;
            break;
        }
        if (!flag) throw TypeError("Empty array can't be reduced")
    }
    
    for (; i < this.length; i++){
        if (!(i in this)) continue;
        acc = cb.call(thisArg, acc, this[i], i, this);
    }
    
    return acc;
    
}


console.log([1, 2, 3].reduce((a, b) => a + b)); // 6
console.log([1, 2, 3].reduce((a, b) => a + b, 10)); // 16
console.log([, , 3].reduce((a, b) => a + b)); // 3
console.log([, , ,].reduce((a, b) => a + b)); // throws Error
