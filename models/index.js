const Chars = require('./Chars')
const Enemies = require('./Enemies')
const Items = require('./Items')
const Map = require("./Map");
const Skills = require('./Skills')
const Users = require('./Users');
const UserChar = require("./UserCharacter")

Users.belongsToMany(Chars, {
    through:UserChar
})

Chars.belongsToMany(Users, {
    through: UserChar
})

UserChar.hasOne(Map, {
    foreignKey: "char_id",
})

Map.belongsTo(UserChar, {
    foreignKey: "char_id",
})

Chars.hasMany(Skills, {
    foreignKey: "char_id",
})

Skills.belongsTo(Chars, {
    foreignKey: "char_id"
})

Map.belongsToMany(Items, {
    through: "map_items"
})

Items.belongsToMany(Map, {
    through: "map_items"
})

Map.belongsToMany(Enemies, {
    through: "map_enemy"
})

Enemies.belongsToMany(Map, {
    through: "map_enemy"
})



module.exports = { Chars, Enemies, Items, Map, Skills, Users };
