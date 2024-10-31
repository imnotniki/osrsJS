import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import GrandExchange from './geapi.mjs';
import DBHandler from './osrsdb.mjs';
import Database from 'better-sqlite3';
import { generateTimestamp, logPrice, createTables } from './core.mjs';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';





// My libs
const dbFile = "items.db";
const db = new DBHandler(dbFile);
const ge = new GrandExchange();
const cosmicrune = await ge.getItem(1040);
const isNew = db.isNewItem(cosmicrune);


//createTables(db);

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', { item: null, message: null });
});

app.post('/search', async (req, res) => {
    const itemName = req.body.itemName;
    const itemId = req.body.itemId;

    if (itemId) {
        const item = await ge.getItem(itemId);
        res.render('index', { item, message: null });
    } else if (itemName) {
        const items = await db.searchItemsByName(itemName);
        res.json({ items }); // Send items as JSON for AJAX request
    } else {
        res.status(400).json({ items: [] }); // Bad request if no item name or ID provided
    }
});

app.get('/item/:name', async (req, res) => {
    const itemName = req.params.name;
    console.log("Looking for: ", itemName);
    const items = await db.selectQuery("SELECT itemid, itemname, itemimg FROM items WHERE itemname LIKE '%" + itemName + "%'");
    console.log(items);
    if (items && items.length > 0) {
        res.json(items);
    } else {
        res.json([]);
    }
});
app.get('/lol', async (req, res) => {
    let itemName = "hat";
    console.log("Looking for: ", itemName);
    const temp = db.selectQuery("SELECT itemid, itemname, itemimg FROM items WHERE itemname LIKE '%" + itemName + "%'");
    console.log(temp);
});

// Route to add a new item
app.post('/add', async (req, res) => {
    const itemName = req.body.itemName;
    const itemId = req.body.itemId;

    let item;
    if (itemId) {
        item = await ge.getItem(itemId);
    } else if (itemName) {
        const items = await ge.getItemsByName(itemName);
        if (items.length > 0) {
            item = items[0];
        }
    }

    if (item) {
        const isNew = await db.isNewItem(item);
        if (isNew) {
            res.render('index', { item: null, message: 'Item added to database!' });
        } else {
            res.render('index', { item: null, message: 'Item already exists in the database.' });
        }
    } else {
        res.render('index', { item: null, message: 'Item not found in the Grand Exchange.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});