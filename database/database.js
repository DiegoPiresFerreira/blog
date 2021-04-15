const Sequelize = require('sequelize');

const connection = new Sequelize('blog','root','451655916',{
    host: 'localhost',
    dialect:'mysql'
});

module.exports = connection;