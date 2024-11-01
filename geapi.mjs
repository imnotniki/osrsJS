import fetch from 'node-fetch';

class GrandExchange {
    
    
    constructor(apiBaseUrl = 'https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=') {
        this.apiBaseUrl = apiBaseUrl;
        this.options = {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
            }
        }
        this.wikiapi_url = "https://prices.runescape.wiki/api/v1/osrs/latest?id=";
    }

    async getItem(itemId) {
        try {
            const url = this.apiBaseUrl + itemId;
            const response = await fetch(url, this.options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            return data.item;
        } catch (error) {
            throw error;
        }
    }

    async getItemIcon(itemId){
        try{
            const item = await this.getItem(itemId);
            return item.icon;
        }catch(error){
            throw error;
        }
    }

    async getItemsByName(name) {
        const response = await fetch(`https://prices.runescape.wiki/api/v1/osrs/latest?name=${encodeURIComponent(name)}`);
        const data = await response.json();
        
        return Object.values(data); // Adjust this according to the actual response structure
    }

    async wiki5m(itemId){
        const response = await fetch('https://prices.runescape.wiki/api/v1/osrs/5m', this.options);
        const data = await response.json();
        
        return data;
    }

    async wikiGetLatest(itemId){
        const new_url = this.wikiapi_url + itemId;
        const response = await fetch(new_url);
        const data = await response.json();
        
        return data;
    }

    async pattern(itemId){
        try{

        }catch(error){
            throw error;
        }
    }
}

export default GrandExchange;