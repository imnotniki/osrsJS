import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import DBHandler from './osrsdb.mjs';

const dbFile = "items.db";
const db = new DBHandler(dbFile);

const imageDir = './itemimages';
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir);
}


async function downloadImage(url, savePath) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(savePath, Buffer.from(buffer));
}

(async () => {
    const items = await db.selectQuery('SELECT itemid, itemimg FROM items');
    for (const item of items) {
        const { itemid, itemimg } = item;
        const savePath = path.join(imageDir, `${itemid}.gif`);
        try {
            await downloadImage(itemimg, savePath);
            console.log(`Downloaded image for item ${itemid}`);
        } catch (error) {
            console.error(`Failed to download image for item ${itemid}: ${error.message}`);
        }
    }
})();
