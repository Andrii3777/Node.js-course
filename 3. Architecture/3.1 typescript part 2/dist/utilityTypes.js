"use strict";
// 3
class Rectangle {
}
class Circle {
}
// new () => T OR { new(): T}
function f3(Class, count) {
    let a = [];
    for (let i = 0; i < count; i++)
        a.push(new Class());
    return a;
}
let a = f3(Rectangle, 10);
let b = f3(Circle, 20);
//# sourceMappingURL=utilityTypes.js.map