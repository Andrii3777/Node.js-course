// 1
declare function f1<T>(
    data: Partial<T>,
    complement: (arg: Partial<T>) => T
): T;

// 2
type ID = { id: string };

declare function f2<T>(
    data: T | Exclude<T, ID>,
    complement: (arg: T | Exclude<T, ID>) => T
): T;

// 3
class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}

// new () => T OR { new(): T}
function f3<T>(Class: new () => T, count: number): T[] {
    let a: T[] = [];
    for (let i = 0; i < count; i++)
        a.push(new Class());

    return a;
}

let a: Rectangle[] = f3(Rectangle, 10);
let b: Circle[] = f3(Circle, 20);