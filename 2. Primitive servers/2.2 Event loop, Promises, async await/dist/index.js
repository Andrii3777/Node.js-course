"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
/////////////////// 1 ///////////////////////
(function printIP() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.ipify.org?format=json');
            const data = yield response.json();
            console.log('1:', data.ip);
        }
        catch (error) {
            console.log('Error 1:', error);
        }
    });
})();
/////////////////// 2 ///////////////////////
function getIP() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('https://api.ipify.org?format=json');
            const data = yield res.json();
            return data.ip;
        }
        catch (error) {
            console.error('Error 2:', error);
            return '';
        }
    });
}
;
(() => __awaiter(void 0, void 0, void 0, function* () { return console.log('2:', yield getIP()); }))();
/////////////////// 3 ///////////////////////
const urls = Array(3).fill("https://random-data-api.com/api/name/random_name");
/////////////// 3.1 async/await + Promise.all //////////////////
function getNames1() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requests = urls.map((url) => fetch(url));
            const responses = yield Promise.all(requests);
            const data = yield Promise.all(responses.map((response) => response.json()));
            return data.map((item) => item.name);
        }
        catch (error) {
            console.error('Error 3.1:', error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () { return console.log('3.1:', yield getNames1()); }))();
////////////// 3.2 async/await, without Promise.all ////////////////
function getNames2() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const names = [];
            const requests = urls.map((url) => fetch(url));
            try {
                for (var _d = true, requests_1 = __asyncValues(requests), requests_1_1; requests_1_1 = yield requests_1.next(), _a = requests_1_1.done, !_a; _d = true) {
                    _c = requests_1_1.value;
                    _d = false;
                    const request = _c;
                    const response = request;
                    if (!response.ok) {
                        throw new Error(`Request failed with status ${response.status}`);
                    }
                    const data = yield response.json();
                    names.push(data.name);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = requests_1.return)) yield _b.call(requests_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return names;
        }
        catch (error) {
            console.error('Error 3.2:', error);
        }
    });
}
;
(() => __awaiter(void 0, void 0, void 0, function* () { return console.log('3.2:', yield getNames2()); }))();
/////////// 3.3 without async/wait, without Promise.all /////////////
function getNames3() {
    const promises = urls.map(url => fetchName(url));
    return myPromiseAll(promises);
}
function fetchName(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.name)
        .catch(error => {
        console.error('Error fetchName() 3.3:', error);
    });
}
function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        for (const promise of promises) {
            promise.then(result => {
                results.push(result);
                if (results.length === promises.length) {
                    resolve(results);
                }
            }).catch(err => reject('Error myPromiseAll() 3.3: ' + err));
        }
    });
}
getNames3().then(names => console.log('3.3:', names));
///////////////// 4 "gender":"Female" ////////////////////////
function fetchUser() {
    return fetch("https://random-data-api.com/api/users/random_user")
        .then(response => response.json())
        .then(data => data.gender)
        .catch(error => {
        console.error('Error fetchUser() 4:', error);
        return '';
    });
}
///////////////// 4.1 without async/await ////////////////////
const genders = [];
function fetchFemaleUser() {
    return fetchUser()
        .then(gender => {
        genders.push(gender);
        if (gender === "Female") {
            console.log("4.1: Female!");
            return genders;
        }
        else {
            return fetchFemaleUser();
        }
    });
}
fetchFemaleUser().then(genders => console.log('4.1:', genders));
///////////////// 4.2 with async/await ///////////////////////
function getFemaleUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const genders = [];
        let isFemale = false;
        while (!isFemale) {
            yield fetchUser().then(gender => {
                genders.push(gender);
                if (gender === 'Female') {
                    isFemale = true;
                }
            });
        }
        console.log("4.2: Female!");
        return genders;
    });
}
;
(() => __awaiter(void 0, void 0, void 0, function* () { return console.log('4.2:', yield getFemaleUser()); }))();
//////////////////////// 5 ////////////////////////////
/* Function 1, which accepts the callback,
which will be called with the parameter == my current IP */
function function1(callback) {
    fetch('https://icanhazip.com/')
        .then(response => response.text())
        .then(IP => callback(IP.trim()))
        .catch(error => {
        console.error('Error function1() 5:', error);
    });
}
/* Function 2, which can be used with 'await',
which will use function 1 */
function function2() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const f2IP = yield getIP();
            return new Promise((resolve, reject) => {
                function1((f1IP) => {
                    if (f1IP === f2IP) {
                        resolve(`Success! ${f1IP} === ${f2IP}`);
                    }
                });
            });
        }
        catch (error) {
            return Promise.reject(error.message);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () { return console.log('5:', yield function2()); }))().catch((error) => console.error('Error occured:', error));
//////////////////////// 6 ////////////////////////////
function function3() {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch('https://icanhazip.com/')
            .then(response => response.text())
            .then(IP => IP.trim())
            .catch(error => {
            console.error('Error function3() 6:', error);
            return '';
        });
    });
}
function function4(callback) {
    function3().then(ip => callback(ip));
}
function4(ip => console.log("6:", ip));
//# sourceMappingURL=index.js.map