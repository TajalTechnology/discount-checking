'use strict';
const {
    Model
} = require('sequelize');
const http = require('http')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {

            User.hasMany(models.Invoice, { foreignKey: 'userId', onDelete: 'CASCADE' });

        }
    }

    User.init({
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        softDelete: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};