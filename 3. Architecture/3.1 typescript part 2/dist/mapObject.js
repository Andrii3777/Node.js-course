"use strict";
function mapObject(obj, transformer) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = transformer(obj[key]);
        }
    }
    return result;
}
// Test
const arr1 = { "roma": 5, "vasya": 2 };
const arr2 = { roma: "Ivanov", vasya: "Popov" };
const arr3 = { 1: true, 2: false, 3: true };
console.log(mapObject(arr1, (e) => e > 2));
console.log(mapObject(arr2, (e) => e.length));
console.log(mapObject(arr3, (e) => e ? 'yes' : 'no'));
// The same function without using Record<K, T>
/* function mapObject<T, V>(
    obj: { [key: K]: T }, transformer: (arg: T) => V
): { [key: K]: V } {
    let newObj: { [key: K]: V } = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = transformer(obj[key]);
        }
    }

    return newObj;
} */ 
//# sourceMappingURL=mapObject.js.map