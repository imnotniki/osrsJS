
export function generateTimestamp() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0'); 
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear(); 
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0'); 
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function logPrice(db, price){
    const stmt = db.prepare('INSERT INTO prices (itemid, price, timestamp) VALUES (?, ?, ?)');
    stmt.run(price.itemid, price.price, price.timestamp);
}

export function createTables(db){
    const create1 = db.prepare(`
        CREATE TABLE IF NOT EXISTS "txs" (
            "txid" INTEGER NOT NULL,
            "operation" INTEGER,
            "itemid" INTEGER,
            "price" NUMERIC,
            "timestamp" TEXT,
            PRIMARY KEY("txid" AUTOINCREMENT)
        );`);
    const create2 = db.prepare(`
    CREATE TABLE IF NOT EXISTS "items" (
        "itemid" INTEGER,
        "itemname" TEXT,
        "itemimg" TEXT
    );`);
    const create3 = db.prepare(`
    CREATE TABLE IF NOT EXISTS "holdings" (
        "holdingid" INTEGER,
        "itemid" INTEGER,
        "amount" INTEGER,
        "buyprice" NUMERIC,
        "timestamp" TEXT,
        PRIMARY KEY("holdingid" AUTOINCREMENT)
    );`);
    const create4 = db.prepare(`
    CREATE TABLE IF NOT EXISTS "prices" (
        "priceid" INTEGER,
        "itemid" INTEGER,
        "price" INTEGER,
        "timestamp" TEXT,
        PRIMARY KEY("priceid" AUTOINCREMENT)
    );
    `);
    create1.run();
    create2.run();
    create3.run();
    create4.run();
}
