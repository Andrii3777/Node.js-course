// Function to read input data correctly
function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// 1.2.4 forms and html output
function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}`);
    for (let key in headers) {
        console.log(`${key}: ${headers[key]}`);
    }
    console.log(`\n${body}`);
}

// 1.2.4 forms and html output
function processHttpRequest($method, $uri, $headers, $body) {
    let statusCode, statusMessage, headers, body, login, password;

    let isValidMethod = ($method === 'POST');
    let isValidUri = ($uri === '/api/checkLoginAndPassword');
    let isValidContentType = ($headers["Content-Type"] === "application/x-www-form-urlencoded");
    let isValidBody = /^login=\w+&password=\d+$/.test($body);

    if (isValidMethod && isValidUri && isValidContentType && isValidBody) {
        login = $body.split("=")[1].replace('&password', '');
        password = $body.split("=")[2];

        try {
            let fileText = require("fs").readFileSync("passwords.txt").toString();
            let foundCredentials = new RegExp(`^${login}:${password}$`, 'm').test(fileText);

            statusCode = foundCredentials ? '200' : '401';
            statusMessage = foundCredentials ? 'OK' : 'Unauthorized';
            body = foundCredentials ? '<h1 style="color:green">FOUND</h1>' : 'not found';
        } catch (err) {
            statusCode = '500';
            statusMessage = 'Internal Server Error';
            body = 'not found';
        }
    }
    else if (!isValidMethod || !isValidBody) {
        statusCode = '400';
        statusMessage = 'Bad Request';
        body = 'not found';
    }
    else if (!isValidUri || !isValidContentType) {
        statusCode = '404';
        statusMessage = 'Not Found';
        body = 'not found';
    }

    headers = {
        //"Date": new Date().toUTCString(),
        "Server": "Apache/2.2.14 (Win32)",
        "Content-Length": body?.toString().length,
        "Connection": "Closed",
        "Content-Type": "text/html; charset=utf-8",
    };

    outputHttpResponse(statusCode, statusMessage, headers, body);
}

// 1.2.2 HTTP request
function parseTcpStringAsHttpRequest(str) {
    return {
        method: str.match(/[A-Z]+/)?.[0],
        uri: str.match(/\/\S+/)?.[0],
        headers: str.match(/[\w-]+:.+/g).reduce((obj, str) => {
            const [key, val] = str.split(':');
            obj[key.trim()] = val.trim();
            return obj;
        }, {}),
        body: str.match(/^\w+=[^\s=]+=[^\s=]+$/im)?.[0]
    };
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);