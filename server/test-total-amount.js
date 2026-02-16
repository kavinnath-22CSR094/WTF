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
    console.log('Running Total Amount Persistence Test...');

    try {
        const order = {
            name: 'Total Amount Tester',
            contact: '1234567890',
            location: 'Test Block',
            rollNo: 'TEST-TOTAL-001',
            items: JSON.stringify([
                { name: 'Plain Biriyani', quantity: 2, price: '₹150' }, // 300
                { name: 'Mojito', quantity: 1, price: '₹120' } // 120
            ]),
            totalAmount: 420 // 300 + 120
        };

        const res = await postOrder(order);

        if (res.statusCode === 201) {
            const responseData = JSON.parse(res.body);
            if (responseData.order && responseData.order.totalAmount === 420) {
                console.log('PASS: Order created and totalAmount (420) persisted correctly!');
            } else {
                console.log(`FAIL: totalAmount mismatch. Expected 420, got ${responseData.order ? responseData.order.totalAmount : 'undefined'}`);
                console.log('Full Response:', JSON.stringify(responseData, null, 2));
            }
        } else {
            console.log(`FAIL: Order failed with status ${res.statusCode}`);
            console.log('Body:', res.body);
        }
    } catch (e) {
        console.error('Test Error:', e);
    }
}

runTest();
