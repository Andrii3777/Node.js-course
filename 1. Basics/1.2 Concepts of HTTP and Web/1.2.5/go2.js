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

// 1.2.5
function processHttpRequest($method, $uri, $headers, $body) {
    let statusCode, statusMessage, headers, body;

    let isValidMethod = ($method === 'GET');
    let isValidUri = /^\/([\w/]*(.txt|.html)?)?$/.test($uri);

    if (isValidMethod && isValidUri) {
        try {
            let baseFolder = '';
            if ($headers['Host'].startsWith("student.shpp.me")) {
                baseFolder = "student";
            } else if ($headers['Host'].startsWith("another.shpp.me")) {
                baseFolder = "another";
            } else {
                const error = new Error("Permission denied");
                error.code = "EACCES";
                throw error;
            }

            $uri = $uri === '/' ? '/index.html' : $uri;
            body = require("fs").readFileSync('./' + baseFolder + $uri).toString();

            statusCode = '200';
            statusMessage = 'OK';
        } catch (err) {
            if (err.code === "ENOENT") {
                statusCode = '404';
                statusMessage = 'Not Found';
                body = 'not found';
            } else if (err.code === "EACCES") {
                statusCode = '403';
                statusMessage = 'Forbidden';
                body = 'Access denied';
            }
        }
    }
    else if (!isValidMethod) {
        statusCode = '400';
        statusMessage = 'Bad Request';
        body = 'not found';
    }
    else if (!isValidUri) {
        statusCode = '404';
        statusMessage = 'Not Found';
        body = 'not found';
    }

    headers = {
        // "Date": new Date().toUTCString(),
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
        uri: str.match(/\/\S*/)?.[0],
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