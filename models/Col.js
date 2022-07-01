const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Col extends Model { }

Col.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //name this column whatever you want
        map_id: {
            //this is the type of data that will be stored in this column
            type: DataTypes.INTEGER,
            //each time a row of data is inserted, this column will need to have a value
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'col',
    }
);

module.exports = Col;