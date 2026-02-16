const http = require('http');

function postOrder(data) {
    return new Promise((resolve, reject) => {
        const boundary = '--------------------------' + Date.now().toString(16);

        let body = '';
        for (const key in data) {
            body += `--${boundary}\r\n`;
            body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
            body += `${data[key]}\r\n`;
        }
        body += `--${boundary}--\r\n`;

        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/orders',
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = http.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: responseBody });
            });
        });

        req.on('error', (e) => reject(e));
        req.write(body);
        req.end();
    });
}

const fs = require('fs');

async function runTests() {
    let output = 'Running API Tests...\n';

    // Test 1: COD Order (Success Expected)
    try {
        const codOrder = {
            name: 'Test COD User',
            contact: '1234567890',
            location: '123 Fake St',
            paymentMethod: 'COD',
            items: JSON.stringify([{ name: 'Pizza', quantity: 1 }])
        };
        const res1 = await postOrder(codOrder);
        output += `Test 1 (COD Order): Status ${res1.statusCode}\n`;
        if (res1.statusCode === 201) {
            output += 'PASS: COD Order created successfully\n';
        } else {
            output += `FAIL: COD Order failed ${res1.body}\n`;
        }
    } catch (e) {
        output += `Test 1 Error: ${e}\n`;
    }

    // Test 2: GPay Order Missing Params (Failure Expected)
    try {
        const gpayOrder = {
            name: 'Test GPay User',
            contact: '1234567890',
            location: '123 Fake St',
            paymentMethod: 'GPay',
            items: JSON.stringify([{ name: 'Pizza', quantity: 1 }])
        };
        const res2 = await postOrder(gpayOrder);
        output += `Test 2 (GPay Missing Params): Status ${res2.statusCode}\n`;
        if (res2.statusCode === 400) {
            output += 'PASS: GPay Order correctly rejected (missing fields)\n';
        } else {
            output += `FAIL: GPay Order should have failed but got ${res2.statusCode} ${res2.body}\n`;
        }
    } catch (e) {
        output += `Test 2 Error: ${e}\n`;
    }

    fs.writeFileSync('test_output.txt', output);
    console.log(output);
}

runTests();
