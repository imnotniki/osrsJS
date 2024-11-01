import GrandExchange from './geapi.mjs';

import { print, convertTime } from './core.mjs';

(async () => {
    
    const ge = new GrandExchange();
    let itemid = 21006;
    const latest = await ge.wikiGetLatest(itemid);
    //const price = await ge.wiki5m(itemid);
    print(latest);
    const itemKey = itemid.toString();
    //print(item.data.highTime);
    //print(convertTime(item.highTime));
    print("Latest:");
    const highTime = latest.data[itemKey]?.highTime;
    const highPrice = latest.data[itemKey]?.high;
    const lowTime = latest.data[itemKey]?.lowTime;
    const lowPrice = latest.data[itemKey]?.low;
    const highTimeDate = new Date(highTime * 1000);
    const lowTimeDate = new Date(lowTime * 1000);
    console.log("High Time: ", highTimeDate.toLocaleTimeString());
    console.log("High Price: ", highPrice);
    console.log("Low Time: ", lowTimeDate.toLocaleTimeString());
    console.log("Low Price: ", lowPrice);
    //print(price.data[itemKey]?.avgHighPrice);
})();