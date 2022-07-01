require('dotenv').config();
const Dungeon = require("dungeon-generator");
const sequelize = require('../config/connection');
const { Map, Grid } = require("../models/index");
const namor = require("namor")
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
    return dun.walls.rows
}

// create the maps first
// async function seedMePlease() {
//     const seeds = genMap2()
//     let map = await Map.bulkCreate([
//         { name: 'test1' },
//         { name: 'test2' },
//         { name: 'test3' }
//     ])
// }

async function seedMePlease() {
    //associate with userid of some sort;
    const seeds = genMap2();
    let map = await Map.create({ name: namor.generate({ manly: true, words: 2 }).split("-").slice(0, 2).map(word => word[0].toUpperCase() + word.slice(1, word.length + 1)).join(" "), map: JSON.stringify(seeds) })
    return map.dataValues
}


// get a random int 1 - 100 (that is the map id)
// await Map.findOne(id)
// let cols = Col.where({ map_id: id })
// for loop to get all the rows
// let rows = Row.where({ col_id: cols[i].dataValues.id })
// create your array of arrays of booleans

// sequelize.sync({ force: false }).then(async () => {
//     await Promise.all([...Array(10)].map((_, i) => seedMePlease()));
//     const allMaps = await Map.findAll({ include: [{ model: Grid }] });
//     //get random map
//     const randoMap = allMaps[~~(Math.random() * allMaps.length)];
//     //serialize data
//     const mapClean = randoMap.get({ plain: true });

//     const twodArray = JSON.parse(mapClean.map);
//     console.log(twodArray)
//     // process.exit()
// });

const getRandomMap = async () => {
    const newMap = await seedMePlease();
    newMap.map = JSON.parse(newMap.map).map(row => ({ cols: row }));
    // const allMaps = await Map.findAll({ include: [{ model: Grid }] });
    // //get random map
    // const randoMap = allMaps[~~(Math.random() * allMaps.length)];
    // //serialize data
    // const mapClean = randoMap.get({ plain: true });

    return newMap
}


module.exports = { genMapv2: genMap2, getRandomMap };