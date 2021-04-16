const express = require('express');
const app = express();
const connection = require('./database/database');

const categories_controller = require('./categories/categories_controller');
const articles_controller = require('./articles/articles_controller');

const article = require('./articles/article');
const category = require('./categories/category');

// View Engine
app.set('view engine','ejs');

// receber formularios
app.use(express.urlencoded({extended: false}));
// aceitar json
app.use(express.json());

//database
connection
    .authenticate()
    .then(()=>{
        console.log("Banco de dados conectado"); 
    }).catch((error)=>{
        console.log(error);
    })


app.use('/',categories_controller);
app.use('/',articles_controller);

//static
app.use(express.static('public'));


app.get('/',(req, res)=>{   
    article.findAll({
        order: [['id','DESC']]
    }).then(articles=>{
        category.findAll().then(categories=>{
            res.render('index',{articles,categories});
        })
    })
})

app.get('/:slug',(req, res)=>{   
    const slug = req.params.slug;
    article.findOne({
        where: {slug}
    }).then(article=>{
        if(article!=undefined){
            category.findAll().then(categories=>{
                res.render('article',{article,categories});
            })
        }else{
            res.redirect('/');
        }
    }).catch(err=>{
        res.redirect("/");
    })
})
app.get('/category/:slug',(req, res)=>{
    const slug = req.params.slug;
    category.findOne({
        where: {slug},
        include: [{model:article}]

    }).then(categori=>{
        if(categori!=undefined){
            category.findAll().then(categories=>{
                res.render('index',{articles:categori.articles, categories})
            })
        }else{
            res.redirect('/')
        }
    }).catch(err=>{
        res.redirect('/')
    })
})
app.listen(8080,()=>{
    console.log("Servidor rodando!");
})