//the MODEL of the MVC, define all data logic and relations here

//import the example model
const Col = require('./Col');
const Example = require('./Example');
const Row = require('./Row');

Map.hasMany(Col, {
    foreignKey: 'map_id'
})
Col.belongsTo(Map, {
    foreignKey: 'map_id',
    onDelete: 'CASCADE'
})
Col.hasMany(Row, {
    foreignKey: 'col_id'
})
Row.belongsTo(Col, {
    foreignKey: 'col_id',
    onDelete: 'CASCADE'
})


module.exports = { Example };