import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();
import GrandExchange from './geapi.mjs';
import DBHandler from './osrsdb.mjs';
import Database from 'better-sqlite3';
import { generateTimestamp, logPrice, createTables } from './core.mjs';
import fetch from 'node-fetch';

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// My libs
const dbFile = "items.db";
const db = new DBHandler(dbFile);
const ge = new GrandExchange();

async function sendUpdateMessages() {
    const trackers = await db.selectQuery('SELECT tracker.itemid, chatid, itemname FROM tracker LEFT JOIN items on tracker.itemid = items.itemid');
    for (const tracker of trackers) {
        const { itemid, chatid, itemname } = tracker;
        const latest = await ge.wikiGetLatest(itemid);
        const itemKey = itemid.toString();
        const highTime = latest.data[itemKey]?.highTime;
        const highPrice = latest.data[itemKey]?.high;
        const lowTime = latest.data[itemKey]?.lowTime;
        const lowPrice = latest.data[itemKey]?.low;
        const highTimeDate = new Date(highTime * 1000).toLocaleTimeString();
        const lowTimeDate = new Date(lowTime * 1000).toLocaleTimeString();
        sendMsg(chatid, `Item: ${itemname}\nHighest price: ${highPrice} at ${highTimeDate}.\nLowest price: ${lowPrice} at ${lowTimeDate}.`);
    }
}

bot.onText(/\/addTracker (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const itemid = match[1];
    if(db.addTracker(chatId, itemid) == 1){
        sendMsg(chatId, "Successfully added tracker.");
    }else{
        sendMsg(chatId, "Error while adding tracker. Try again.");
    }
});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	
    console.log(msg);
    handleCommand(msg);
	
});

function handleCommand(msg){
	const text = msg.text;
	const chatId = msg.chat.id;
	if(text.startsWith("screen")){
		sendMsg(chatId, "You would get a screen");
	}
}

function sendMsg(chatId, message){
	bot.sendMessage(chatId, message);
}

sendUpdateMessages();
setInterval(sendUpdateMessages, 5 * 60 * 1000);