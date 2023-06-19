/////////////////// 1 ///////////////////////
(async function printIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('1:', data.ip);
    } catch (error) {
        console.log('Error 1:', error);
    }
})();

/////////////////// 2 ///////////////////////
async function getIP(): Promise<string> {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        return data.ip;
    } catch (error) {
        console.error('Error 2:', error);
        return '';
    }
}

; (async () => console.log('2:', await getIP()))();

/////////////////// 3 ///////////////////////
const urls = Array(3).fill("https://random-data-api.com/api/name/random_name");

/////////////// 3.1 async/await + Promise.all //////////////////
async function getNames1() {
    try {
        const requests = urls.map((url) => fetch(url));
        const responses = await Promise.all(requests);
        const data = await Promise.all(responses.map((response) => response.json()));
        return data.map((item) => item.name);
    } catch (error) {
        console.error('Error 3.1:', error);
    }
}

(async () => console.log('3.1:', await getNames1()))();

////////////// 3.2 async/await, without Promise.all ////////////////
async function getNames2() {
    try {
        const names = [];
        const requests = urls.map((url) => fetch(url));

        for await (const request of requests) {
            const response = request;
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            names.push(data.name);
        }

        return names;
    } catch (error) {
        console.error('Error 3.2:', error);

    }
}

; (async () => console.log('3.2:', await getNames2()))();

/////////// 3.3 without async/wait, without Promise.all /////////////
function getNames3() {
    const promises = urls.map(url => fetchName(url));
    return myPromiseAll(promises);
}

function fetchName(url: string) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.name)
        .catch(error => {
            console.error('Error fetchName() 3.3:', error);
        });
}

function myPromiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];
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
function fetchUser(): Promise<string> {
    return fetch("https://random-data-api.com/api/users/random_user")
        .then(response => response.json())
        .then(data => data.gender)
        .catch(error => {
            console.error('Error fetchUser() 4:', error);
            return '';
        });
}

///////////////// 4.1 without async/await ////////////////////
const genders: string[] = [];
function fetchFemaleUser(): Promise<string[]> {
    return fetchUser()
        .then(gender => {
            genders.push(gender);

            if (gender === "Female") {
                console.log("4.1: Female!");
                return genders;
            } else {
                return fetchFemaleUser();
            }
        })
}

fetchFemaleUser().then(genders => console.log('4.1:', genders));

///////////////// 4.2 with async/await ///////////////////////
async function getFemaleUser() {
    const genders: string[] = [];
    let isFemale = false;

    while (!isFemale) {
        await fetchUser().then(gender => {
            genders.push(gender);

            if (gender === 'Female') {
                isFemale = true;
            }
        });
    }

    console.log("4.2: Female!");
    return genders;
}

; (async () => console.log('4.2:', await getFemaleUser()))();


//////////////////////// 5 ////////////////////////////
/* Function 1, which accepts the callback,
which will be called with the parameter == my current IP */
function function1(callback: (ipAddress: string) => void) {
    fetch('https://icanhazip.com/')
        .then(response => response.text())
        .then(IP => callback(IP.trim()))
        .catch(error => {
            console.error('Error function1() 5:', error);
        });
}

/* Function 2, which can be used with 'await',
which will use function 1 */
async function function2(): Promise<string> {
    try {
        const f2IP = await getIP();

        return new Promise((resolve, reject) => {
            function1((f1IP) => {
                if (f1IP === f2IP) {
                    resolve(`Success! ${f1IP} === ${f2IP}`);
                }
            });
        });
    } catch (error: any) {
        return Promise.reject(error.message);
    }
}

(async () => console.log('5:', await function2()))().catch((error) =>
    console.error('Error occured:', error)
);

//////////////////////// 6 ////////////////////////////
async function function3(): Promise<string> {
    return fetch('https://icanhazip.com/')
        .then(response => response.text())
        .then(IP => IP.trim())
        .catch(error => {
            console.error('Error function3() 6:', error);
            return '';
        });
}

function function4(callback: (ip: string) => void): void {
    function3().then(ip => callback(ip));
}

function4(ip => console.log("6:", ip));
