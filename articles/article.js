const Sequelize = require('sequelize');
const connection = require('../database/database');
const category = require('../categories/category')

const Article = connection.define('articles',{

    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

category.hasMany(Article) // tem muitos
Article.belongsTo(category); // um para um

//Article.sync({force: true});

module.exports = Article;