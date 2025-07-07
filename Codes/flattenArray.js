Array.prototype.myFlat = function (depth=1){
    let res = [];
    
    function util(depth, arr, ind){
        if (ind >= arr.length) return;
        if (depth === 0) {
            res.push(arr[ind]);
        }
        else {
            if (Array.isArray(arr[ind])) {
                util(depth-1, arr[ind], 0);
            }
            else {
                res.push(arr[ind]);
            }
        }
        util(depth, arr, ind+1)
    }
    
    util(depth, this, 0);
    
    return res;
}


version 2:

function flattenArray(arr, depth = 1){
    
    function util(arr, depth){
        if (depth === 0) return [...arr];
        let res = [];
        for (const ele of arr){
            if (Array.isArray(ele)){
                res.push(...util(ele, depth-1));
            } else {
                res.push(ele);
            }
        }
        return res;
    }
    return util(arr, depth);
}
