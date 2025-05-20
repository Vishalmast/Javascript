Function.prototype.customCall = function(thisArg, ...args) {
    thisArg = thisArg || globalThis;
    const symbol = Symbol("");
    thisArg[symbol] = this;
    
    const res = thisArg[symbol](...args);
    delete thisArg[symbol];
    return res;
}


function test(){
    console.log(`This is ${this.name}`);
}

test.customCall({name:"Vishal"}); //This is Vishal
test.customCall({name:"Verma"}); //This is Verma
