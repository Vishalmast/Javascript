Function.prototype.customBind = function(thisArg, ...args) {
    thisArg = thisArg || globalThis;
    let symbol = Symbol("");
    const fn = this;
    
    return function(...newArgs){
        thisArg[symbol] = fn;
        const res = thisArg[symbol](...args, ...newArgs);
        delete thisArg[symbol];
        return res;
    }
}

function test(){
    console.log(`this is ${this.name}`);
}

bindedTest = test.customBind({name: "Vishal"});
bindedTest(); //this is Vishal
bindedTest(); //this is Vishal
