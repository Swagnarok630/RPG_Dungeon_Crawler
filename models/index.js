//the MODEL of the MVC, define all data logic and relations here
// TODO: Cleanup and refactor

//import the example model
const Chars = require('./Chars')
const Col = require('./Col');
const Grid = require("./Grid");
const Items = require('./Items')
const Map = require("./Map");
const Row = require('./Row');
const Skills = require('./Skills')
const Users = require('./Users')


// Map.hasMany(Col, {
//     foreignKey: 'map_id'
// })
// Col.belongsTo(Map, {
//     foreignKey: 'map_id',
//     onDelete: 'CASCADE'
// })
// Col.hasMany(Row, {
//     foreignKey: 'col_id'
// })
// Row.belongsTo(Col, {
//     foreignKey: 'col_id',
//     onDelete: 'CASCADE'
// })

Map.hasMany(Grid, {
    foreignKey: 'map_id'
});
Grid.belongsTo(Map, {
    foreignKey: 'map_id'
})


module.exports = { Chars, Grid, Items, Map, Skills, Users };
