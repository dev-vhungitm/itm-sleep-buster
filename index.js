import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const targetURLs = (process.env.TARGET_URLS || '').split(',');

app.get('/api/ping', async (_, res) => {
	res.send(`Haha ping successfully`);
	console.log(targetURLs);

	targetURLs.forEach(url => {
		setTimeout(async () => {
			try {
				const r = await fetch(url);
				console.log(`${new Date().toISOString()}: Pinged ${url} -> ${r.status}`);
			} catch (err) {
				console.error(`${new Date().toISOString()}: Failed to ping ${url}: ${err.message}`);
			}
		}, 12 * 60 * 1000);
	});
});

export default app;
