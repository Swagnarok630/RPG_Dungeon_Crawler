const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Row extends Model { }

Row.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //name this column whatever you want
        col_id: {
            //this is the type of data that will be stored in this column
            type: DataTypes.INTEGER,
            //each time a row of data is inserted, this column will need to have a value
            allowNull: false,
        },
        value: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'row',
    }
);

module.exports = Row;