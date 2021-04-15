const express = require('express');
const app = express();
const connection = require('./database/database');

const categories_controller = require('./categories/categories_controller');
const articles_controller = require('./articles/articles_controller');

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
    res.render('index');
})

app.listen(8080,()=>{
    console.log("Servidor rodando!");
})