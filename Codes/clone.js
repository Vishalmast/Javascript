function clone(obj, visited = new WeakMap()){
    if (typeof obj !== "object" || obj === null) return obj;
    
    if (visited.has(obj)) return visited.get(obj);
    if (Array.isArray(obj)) {
        let res = Array(obj.length);
        visited.set(obj, res);
        for(let i = 0; i < obj.length; i++){
            if (!(i in obj)) continue;
            res[i] = clone(obj[i], visited);
        }
        return res;
    }
    if (obj instanceof Date) return new Date(obj);
    
    if (obj instanceof Function) return obj;
    
    if (obj instanceof Map){
        let res = new Map();
        visited.set(obj, res);
        for (let [key, value] of obj){
            res.set(key, clone(value, visited));
        }
        return res;
    }
    
    if (obj instanceof Set){
        let res = new Set();
        visited.set(obj, res);
        for(let value of obj){
            res.add(clone(value, visited));
        }
        return res;
    }
    
    let res = {};
    visited.set(obj, res);
    for (const key of Object.keys(obj)){
        res[key] = clone(obj[key], visited);
    }
    
    for (const sym of Object.getOwnPropertySymbols(obj)){
        res[sym] = clone(obj[sym], visited);
    }
    return res;
}
