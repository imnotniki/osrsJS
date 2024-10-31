# osrsJS

### Features

- Enter Buy/Sell Operations you did on the G.E.

### Planned
- Track favorited items
- API to RuneLite

##### npm packages
```bash
npm install runescape-api better-sqlite3 express
```

#### Database layout for now
##### Items

| itemid  | itemname  | itemimg |
| :------------ |:---------------| -----:|
| 564      | cosmic rune | https://secure.runescape.com/m=itemdb_oldschool/1730287781460_obj_sprite.gif?id=564 |

##### Transactions
- operation (1 = Buy, 0 = Sell)

| txid  | operation  | itemid | amount | price | timestamp |
| :------------ |:---------------| -----:| -----:| -----:| -----:|
| 1 | 1 | 564 | 20000 | 80 | 30.10.2024 12:49
| 2 | 0 | 564 | 20000 |120 | 31.10.2024 14:10
| 3 | 1 | 564 | 30000 | 90 | 31.10.2024 14:11

##### Holdings
- Open profit!

| holdingid  | itemid  | amount | buyprice | timestamp |
| :------------ |:---------------| -----:| -----:| -----:|
| 1 | 564 | 20000 | 80 | 30.10.2024 12:49
| 2 | 564 | 30000 | 90 | 31.10.2024 14:11

##### Prices
- Open profit!

| priceid  | itemid  | price | timestamp |
| :------------ |:---------------| -----:| -----:| -----:|
| 1 | 564 | 85 | 30.10.2024 04:00
| 2 | 564 | 86 | 30.10.2024 08:00
