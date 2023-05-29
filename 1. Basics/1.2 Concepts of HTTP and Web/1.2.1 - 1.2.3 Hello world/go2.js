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

// 1.2.3 HTTP response
function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}`);
    for (let key in headers) {
        console.log(`${key}: ${headers[key]}`);
    }
    console.log(`\n${body}`);
}

// 1.2.3 HTTP response
function processHttpRequest($method, $uri, $headers, $body) {
    let statusCode, statusMessage, headers, body;

    if ($method === 'GET' && /^\/sum\?nums=([\d,]+)$/.test($uri)) {
        statusCode = '200';
        statusMessage = 'OK';
        numbers = $uri.split("=")[1].split(",").map(Number);
        body = numbers.reduce((sum, curr) => sum + curr, 0);
    }
    else if ($method !== 'GET' || /^\/sum(?!\?nums=).+([\d,]+)$/.test($uri)) {
        statusCode = '400';
        statusMessage = 'Bad Request';
        body = 'not found';
    }
    else if (!$uri.startsWith("/sum")) {
        statusCode = '404';
        statusMessage = 'Not Found';
        body = 'not found';
    }
    
    headers = {
        "Date": new Date().toUTCString(),
        "Server": "Apache/2.2.14 (Win32)",
        "Connection": "Closed",
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": body?.toString().length,
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
