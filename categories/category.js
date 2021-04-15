const Sequelize = require('seuqelize');
const connection = require('../database/database');

const Category = connection.define('categories',{
    title:{
        type: Sequelize.String,
        allowNull: false
    },
    slug:{
        type: Sequelize.String,
        allowNull: false
    }
})

module.exports = Category;