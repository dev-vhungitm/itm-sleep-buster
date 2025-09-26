import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const targetURLs = (process.env.TARGET_URLS || '').split(',');

app.get('/ping', async (_, res) => {
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
		}, 5 * 1000);
	});
});

app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
