const Chars = require('./Chars')
const Enemies = require('./Enemies')
const Items = require('./Items')
const Map = require("./Map");
const Skills = require('./Skills')
const Users = require('./Users')

Chars.hasOne(Map, {
    foreignKey: "map_id",
})

Map.belongsTo(Chars, {
    foreignKey: "map_id",
})

Chars.hasMany(Skills, {
    foreignKey: "char_id",
})

Skills.belongsTo(Chars, {
    foreignKey: "char_id"
})

Map.hasMany(Items, {
    foreignKey: "map_id",
})

Items.belongsTo(Map, {
    foreignKey: "map_id",
})

Map.hasMany(Enemies, {
    foreignKey: "map_id"
})

Enemies.belongsTo(Map, {
    foreignKey: "map_id",
})

Users.hasMany(Chars, {
    foreignKey: "char_id",
})

Chars.belongsTo(Users, {
    foreignKey: "char_id",
})


module.exports = { Chars, Enemies, Items, Map, Skills, Users };
