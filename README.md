# WhatsApp Native Bridge (Add-on) 💬🤖

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A standalone Home Assistant Add-on that provides a native WhatsApp bridge using `whatsapp-web.js`. It runs a headless Chromium browser and exposes a REST API for Home Assistant to send messages, completely free and without requiring Meta/Twilio business APIs!

## 🚀 Features
- **No Business API Needed:** Uses standard WhatsApp Web QR Code scanning.
- **REST API:** Easily send messages from Node-RED, curl, or the companion HACS integration.
- **Standalone:** Runs in its own Docker container, isolated from Home Assistant Core.

## 🛠️ Installation
1. Go to Home Assistant **Settings** > **Add-ons** > **Add-on Store**.
2. Click the three dots (top right) and select **Repositories**.
3. Add this repository URL: `https://github.com/Zedan2552000/whatsapp_bridge_addon`
4. Reload the page, search for **WhatsApp Native Bridge**, and install it.
5. Start the Add-on and click **Open Web UI**.
6. Scan the QR code with your WhatsApp app (Linked Devices).

## 🧩 Companion HACS Integration
To easily use this Add-on from Home Assistant Automations (as a `notify` service), install the companion HACS integration from:
`https://github.com/Zedan2552000/whatsapp_bridge_hacs`

## 🤝 Contributing
Contributions are welcome!

## 📄 License
MIT License
