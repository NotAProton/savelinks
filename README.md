# Save Links

This product follows a microservices architecture, composed of the following services:

- [Backend](./backend/README.md)
  Built with Node.js as event-driven functions hosted on Cloudflare.

- [Frontend: Extension](./frontend/extension/README.md)
  Built with Vite+React as an MV-3 browser extension.

- [Frontend: Web](./frontend/web/README.md)
  Built with Next.js as a fast SSR web app.

## Installing

Download the extension from the releases page and install it in your browser. On chrome, you can do this by going to `chrome://extensions/`, enabling developer mode, and dragging the zipfile into the window.

## Usage

To use the extension, click on the icon in the browser toolbar. This will open the extension popup, where you can save links by clicking the "Save" button. You can also view your saved links by clicking the "View" button.

On the View page, you can see all your saved links and share them by clicking the "Share Links" button. This will give you a sharable link that you can send to others.

## Compiling

To compile the extension, you need to have Node.js installed. Then, run the following commands:

```bash
git clone https://github.com/notaproton/savelinks.git
cd savelinks
npm install
npm run build
```
