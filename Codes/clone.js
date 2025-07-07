function deepClone(obj, visited = new WeakMap()) {
    // Handle primitives and null
    if (obj === null || typeof obj !== "object") return obj;

    // Handle cycles
    if (visited.has(obj)) return visited.get(obj);

    // WeakMap and WeakSet (can't clone contents)
    if (obj instanceof WeakMap) return new WeakMap();
    if (obj instanceof WeakSet) return new WeakSet();

    // Date
    if (obj instanceof Date) return new Date(obj);

    // RegExp
    if (obj instanceof RegExp) return new RegExp(obj);

    // Map
    if (obj instanceof Map) {
        const res = new Map();
        visited.set(obj, res);
        for (const [key, value] of obj.entries()) {
            res.set(deepClone(key, visited), deepClone(value, visited));
        }
        return res;
    }

    // Set
    if (obj instanceof Set) {
        const res = new Set();
        visited.set(obj, res);
        for (const value of obj.values()) {
            res.add(deepClone(value, visited));
        }
        return res;
    }

    // Array
    if (Array.isArray(obj)) {
        const res = [];
        visited.set(obj, res);
        for (let i = 0; i < obj.length; i++) {
            res[i] = deepClone(obj[i], visited);
        }
        return res;
    }

    // Function (cannot deep clone function body/closure)
    if (typeof obj === "function") return obj;

    // Symbol (returns a new symbol with same description)
    if (typeof obj === "symbol") return Symbol(obj.description);

    // Generic object (preserve prototype)
    const res = Object.create(Object.getPrototypeOf(obj));
    visited.set(obj, res);

    for (const key of Reflect.ownKeys(obj)) {
        res[key] = deepClone(obj[key], visited);
    }

    return res;
}
