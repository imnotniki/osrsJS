import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import GrandExchange from './geapi.mjs';
import DBHandler from './osrsdb.mjs';
import Database from 'better-sqlite3';
import { generateTimestamp, logPrice, createTables } from './core.mjs';
import fetch from 'node-fetch';

// My libs
const dbFile = "items.db";
const db = new DBHandler(dbFile);
const ge = new GrandExchange();

import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
const tor_password = process.env.tor_password;
const tor_control_port = process.env.tor_control_port;
//createTables(db);
const filePath = 'ua.txt';
function readUserAgents(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            // Split the file content by new lines and filter out empty lines
            const userAgents = data.split('\n').filter(line => line.trim() !== '');
            resolve(userAgents);
        });
    });
}

(async () => {
    
    const url = "https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=";

    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.2420.81",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.4; rv:124.0) Gecko/20100101 Firefox/124.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux i686; rv:124.0) Gecko/20100101 Firefox/124.0"
    ];

    let i = 24081;
    let userAgentIndex = 0;
    while(i < 30000){
        const currentAgent = userAgents[userAgentIndex];
        userAgentIndex = (userAgentIndex + 1) % userAgents.length;

        const options = {
            method: 'GET',
            headers: {
            'User-Agent': currentAgent
            }
        }

        let url_now = url + i;
        try{

      
            
            const response = await fetch(url_now, options);
            if (!response.ok) {
                console.log(i, "Skipped");
                i++;
                continue;
            }else{
                const data = await response.json();
                db.isNewItem(data.item);
                i++;
            }
            
        }catch(error){

        }
        
        
    }
    
})();