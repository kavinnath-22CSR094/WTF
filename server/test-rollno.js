const http = require('http');

function postOrder(data) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(data);
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/orders',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

async function runTest() {
    console.log('Running Roll No API Test...');

    try {
        const order = {
            name: 'Test RollNo User',
            contact: '1234567890',
            location: 'Hostel B',
            rollNo: '2025CS999',
            items: JSON.stringify([{ name: 'Pizza', quantity: 1 }])
        };
        const res = await postOrder(order);
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode === 201) {
            console.log('PASS: Order with Roll No created successfully');
        } else {
            console.log('FAIL: Order failed', res.body);
        }
    } catch (e) {
        console.error('Test Error:', e);
    }
}

runTest();
