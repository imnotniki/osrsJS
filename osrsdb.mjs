import Database from 'better-sqlite3';
class DBHandler {
    constructor(dbFile) {
        this.dbFile = dbFile;
        this.db = new Database(dbFile);
    }

    async getDatabase(){
        return this.db;
    }

    async checkID(itemid){
        try{
            const checkItem = this.db.prepare('SELECT COUNT(*) AS count FROM items WHERE itemid = ?');
            const result = checkItem.get(item.id);
            if (result.count === 0) {
                return "0";
            }else{
                return "1";
            }
        }catch(error){

        }
    }

    async isNewItem(item){
        const checkItem = this.db.prepare('SELECT COUNT(*) AS count FROM items WHERE itemid = ?');
        const result = checkItem.get(item.id);
        if (result.count === 0) {
            console.log(item.id, " is new.");
            await this.addItem(item);
            //console.log("Added it now!");
            return true;
        }else{
            console.log(item.id, " already exists.");
            return false;
        }
    }

    async selectQuery(query){
        const slctquery = this.db.prepare(query);
        const result = await slctquery.all();
        return result;
    }

    async queryItem(itemName){
        try{
            const queryItem = this.db.prepare('SELECT * FROM items WHERE itemname = ?', itemName);
            const matches = await queryItem.all();
            console.log(matches);
            return matches;
        }catch(error){

        }
    }

    async addItem(item){
        const addItem = this.db.prepare('INSERT INTO items (itemid, itemname, itemimg) VALUES (?, ?, ?)');
        addItem.run(item.id, item.name, item.icon);
    }

    async searchItemsByName(name) {
        const stmt = this.db.prepare('SELECT * FROM items WHERE itemname LIKE ?');
        const results = stmt.all(`%${name}%`); // Using wildcard to match any part of the name
        return results; // Returns an array of matching items
    }

}

export default DBHandler;