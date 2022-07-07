require('dotenv').config();
const Dungeon = require("dungeon-generator");
const sequelize = require('../config/connection');
const { Map } = require("../models/index");
const namor = require("namor");
const itemList = ['♥', '⚔', '💩']
const enemyList = ['🕷️', '💀', '🦀']
const defaultSettings =
{
    "size": [20, 15],
    "rooms": {
        "initial": {
            "min_size": [1, 1],
            "max_size": [1, 1],
            "max_exits": 1
        },
        "any": {
            "min_size": [1, 1],
            "max_size": [1, 1],
            "max_exits": 4
        }
    },
    "max_corridor_length": 6,
    "min_corridor_length": 2,
    "corridor_density": 0,
    "symmetric_rooms": false,
    "interconnects": 2,
    "max_interconnect_length": 10,
    "room_count": 20
}

const genMap2 = (settings = defaultSettings) => {
    const dun = new Dungeon(settings);
    // console.dir(dun)
    dun.generate();
    // dun.print();
    //find the farthest node that's solid;
    let exit = null;
    let dist = 0;
    console.log(dun.walls.rows);
    const [x, y] = dun.start_pos;
    dun.walls.rows.forEach((r, i) => r.forEach((n, j) => {
        if (n) return;
        const newDist = Math.abs(i - y) + Math.abs(j - x);
        if (newDist > dist) {
            dist = newDist;
            exit = [j, i];
        }
    }));

    console.log(dun.start_pos, exit)

    return { grids: dun.walls.rows, start: dun.start_pos, exit, char: dun.start_pos };
}

const giveMapItemsAndEnemies = (map, count = 2) => {
    const paths1 = map.map.reduce((a, row, i) => {
        row.cols.map((col, j) => {
            if (col.isPath) {
                a.push([j, i]);
            }
        });
        return a
    }, []);

    const paths2 = map.map.reduce((b, row, i) => {
        row.cols.map((col, j) => {
            if (col.isPath) {
                b.push([j, i]);
            }
        });
        return b
    }, []);

    paths1.sort(() => Math.random() - 0.5);
    const items = paths1.slice(0, count);

    paths2.sort(() => Math.random() - 0.5);
    const enemies = paths2.slice(0, count);

    //iterate through items to modify map grids;

    items.forEach(([x, y]) => {
        map.map[y].cols[x].item = {
            "icon": itemList[~~(Math.random() * itemList.length)]
        }
    });

    enemies.forEach(([x, y]) => {
        map.map[y].cols[x].enemies = {
            "icon": enemyList[~~(Math.random() * enemyList.length)]
        }
    });

    return map;
}

// const giveMapEnemies = (map, count = 3) => {
//     const paths = map.map.reduce((a, row, i) => {
//         row.cols.map((col, j) => {
//             if (col.isPath) {
//                 a.push([j, i]);
//             }
//         });
//         return a
//     }, []);

//     paths.sort(() => Math.random() - 0.5);
//     const enemies = paths.slice(0, count);

//     //iterate through items to modify map grids;

//     enemies.forEach(([x, y]) => {
//         map.map[y].cols[x].enemies = {
//             "icon": enemyList[~~(Math.random() * enemyList.length)]
//         }
//     });

//     return map;
// }


const getRandomMap = async () => {
    const seeds = genMap2();
    const map = await Map.create({ name: namor.generate({ manly: true, words: 2 }).split("-").slice(0, 2).map(word => word[0].toUpperCase() + word.slice(1, word.length + 1)).join(" "), map: JSON.stringify(seeds) })
    const mapParsed = JSON.parse(map.dataValues.map);
    const mapHydrated = {
        ...map.dataValues,
        ...mapParsed,
        map: mapParsed.grids.map((row, i) => ({
            cols: row.map((col, j) => (
                { isPath: !col, isStart: j === mapParsed.start[0] && i === mapParsed.start[1], isExit: j === mapParsed.exit[0] && i === mapParsed.exit[1] }
            ))
        }))
    }

    return giveMapItemsAndEnemies(mapHydrated)
}

module.exports = { genMapv2: genMap2, getRandomMap };