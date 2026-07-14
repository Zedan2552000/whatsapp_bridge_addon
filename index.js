const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode');

const app = express();
app.use(express.json());
const port = 3000;

let latestQrCode = '';
let isReady = false;

// Initialize WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED');
    qrcode.toDataURL(qr, (err, url) => {
        latestQrCode = url;
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
    isReady = true;
    latestQrCode = '';
});

client.on('message', async msg => {
    console.log('Received message:', msg.body);
    // Here we can send Webhook to HA if needed
});

client.initialize();

// REST API for HA HACS component
app.post('/api/send', async (req, res) => {
    if (!isReady) {
        return res.status(503).json({ error: 'WhatsApp client not ready. Please scan QR.' });
    }
    const { number, message } = req.body;
    if (!number || !message) {
        return res.status(400).json({ error: 'Missing number or message' });
    }
    try {
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
        await client.sendMessage(chatId, message);
        res.json({ success: true, status: 'Message sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Web UI to display QR code
app.get('/', (req, res) => {
    if (isReady) {
        res.send('<h1>WhatsApp Bridge is READY!</h1><p>You can close this tab.</p>');
    } else if (latestQrCode) {
        res.send(`<h1>Scan this QR with WhatsApp</h1><img src="${latestQrCode}" />`);
    } else {
        res.send('<h1>Generating QR Code... Please wait and refresh.</h1>');
    }
});

app.listen(port, () => {
    console.log(`WhatsApp Bridge running on port ${port}`);
});
