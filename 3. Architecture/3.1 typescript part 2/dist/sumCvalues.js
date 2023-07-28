"use strict";
function summ(a) {
    const defaultCvalue = 2022;
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if ((elem === null || elem === void 0 ? void 0 : elem.cvalue) === undefined) {
            return defaultCvalue;
        }
        else if (typeof elem.cvalue === 'string') {
            return elem.cvalue === '0' ? 0 : +elem.cvalue || defaultCvalue;
        }
        else if (typeof elem.cvalue === 'object') {
            return summ(elem.cvalue);
        }
        else {
            return elem.cvalue;
        }
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
function sumCvalues(A) {
    let sum = 0;
    const defaultCvalue = 2022;
    for (let key in A) {
        const value = A[key];
        if ((value === null || value === void 0 ? void 0 : value.cvalue) === undefined) {
            sum += defaultCvalue;
        }
        else if (typeof value.cvalue === 'number') {
            sum += value.cvalue;
        }
        else if (typeof value.cvalue === 'string') {
            sum += value.cvalue === '0' ? 0 : +value.cvalue || defaultCvalue;
        }
        else {
            sum += sumCvalues(value.cvalue);
        }
    }
    return sum;
}
// Test
const obj1 = {
    hello: { cvalue: 1 },
    world: { cvalue: { yay: { cvalue: '20' } } }
};
const obj2 = {
    hello: { cvalue: undefined },
    cvalue: undefined,
    world: { cvalue: { yay: { cvalue: undefined } } }
};
const obj3 = {
    prop1: { cvalue: 10 },
    prop2: { cvalue: { prop3: { cvalue: { yay: { cvalue: '0' } } } } },
};
console.log('My function:', sumCvalues(obj1));
console.log('My function:', sumCvalues(obj2));
console.log('My function:', sumCvalues(obj3));
console.log('Bug function:', summ(obj1));
console.log('Bug function:', summ(obj2));
console.log('Bug function:', summ(obj3));
//# sourceMappingURL=sumCvalues.js.map