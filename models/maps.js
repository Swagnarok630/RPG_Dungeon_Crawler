require('dotenv').config();
const Dungeon = require("dungeon-generator");
const sequelize = require('../config/connection');
const Map = require("./Map");
const Col = require("./Col");
const Row = require("./Row");
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
    console.dir(dun)
    dun.generate();
    dun.print();
    return dun.walls.rows
}

// create the maps first
async function seedMePlease() {
    const seeds = genMap2()
    let map = await Map.create({ name: 'fuzzy-bunnies' })
    console.log(map.dataValues)
    for (let i = 0; i < seeds.length; i++) {
        let col = await Col.create({ map_id: map.dataValues.id })
        console.log(col.dataValues)
        console.log(seeds[i])
        for (let j = 0; j < seeds[i].length; j++) {
            let row = await Row.create({ col_id: col.dataValues.id, value: seeds[i][j] })
            console.log(row.dataValues)
        }
    }
}

// get a random int 1 - 100 (that is the map id)
// await Map.findOne(id)
// let cols = Col.where({ map_id: id })
// for loop to get all the rows
// let rows = Row.where({ col_id: cols[i].dataValues.id })
// create your array of arrays of booleans

sequelize.sync({ force: true }).then(() => {
    seedMePlease()
});


module.exports = { genMapv2: genMap2 };