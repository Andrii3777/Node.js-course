// 1. /////////////////////////////////////////////////////////////

function getFirstWord(a: string): number {
    return a.split(/ +/)[0].length;
}

// 2. ////////////////////////////////////////////////////////////

interface User {
    name: string;
    surname: string;
}

function getUserNamings(a: User): { fullname: string; initials: string } {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3. ///////////////////////////////////////////////////////////

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>

interface Product {
    name: string;
}

function getAllProductNames(a?: { products?: Product[] }) {
    return a?.products?.map(prod => prod?.name) || [];
}

// 4.1 ////////////////////////////////////////////////////////////

// easy way is using 'as' keyword
/* interface Name {
    name: () => string;
}

function hey(a: Name): string {
    return "hey! i'm " + a.name();
}
hey({ name: () => "roma", cuteness: 100 } as Name)
hey({ name: () => "vasya", coolness: 100 } as Name) */

// hard way is ?...
interface Name {
    name: () => string;
    [key: string]: any;
}

function hey1(a: Name): string {
    return "hey! i'm " + a.name();
}
hey1({ name: () => "roma", cuteness: 100 })
hey1({ name: () => "vasya", coolness: 100 })

// 4.2 ///////////////////////////////////////////////////////////

interface AbstractPet {
    name: () => string;
}

class Cat implements AbstractPet {
    constructor(private petName: string, private pedigreed: boolean) { }

    name() {
        return this.petName;
    }
}

class Dog implements AbstractPet {
    constructor(private petName: string, private price: number) { }

    name() {
        return this.petName;
    }
}

function hey2(abstractPet: AbstractPet): string {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey2(a)
hey2(b)

// 4.3 //////////////////////////////////////////////////////////

interface Pet {
    name: () => string;
    type: "cat" | "dog";
    cuteness?: number;
    coolness?: number;
}

function hey3(a: Pet): string {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
}
hey3({ name: () => "roma", type: "cat", cuteness: 100 })
hey3({ name: () => "vasya", type: "dog", coolness: 100 })

// 5. //////////////////////////////////////////////////////

// Record type

function stringEntries(a: any[] | Record<string, any>) {
    return Array.isArray(a) ? a : Object.keys(a)
}

// 6. //////////////////////////////////////////////////////

// Promises and async/await

async function world(a: number): Promise<string> {
    return "*".repeat(a)
}

const hello = async (): Promise<string> => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))