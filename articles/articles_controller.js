const express = require('express');
const router = express.Router();
const category = require('../categories/category')
const articles = require('./article')
const slugify = require('slugify')

router.get('/admin/articles',(req, res) => {
    articles.findAll({
        order:[['id','DESC']],
        include:[{model: category}]
    }).then(articles =>{
        res.render('admin/articles/index',{articles})
    })
})

router.get('/admin/articles/new',(req, res) => {
    category.findAll({
        order:[['id','DESC']]
    }).then(categories =>{
        res.render('admin/articles/new',{categories});
    })
    
})

router.post('/articles/save',(req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const categoryId = req.body.category;
    const slug = slugify(title)

    articles.create({title,slug,body,categoryId})
.then(() => {
    res.redirect('/admin/articles/new')
    })
})

router.post('/articles/delete',(req,res)=>{
    const id = req.body.id;
    if(id!=null){
        if(!isNaN(id)){
            articles.destroy({
                where: {id}
            }).then(()=>{
                res.redirect('/admin/articles');
            })
        }else{
            res.redirect('/admin/articles');
        }
    }else{
        res.redirect('/admin/articles');
    }
})

router.get('/admin/articles/edit/:id',(req, res)=>{
    const id = req.params.id;

    articles.findByPk(id).then(article => {
        if(article!=undefined){
            category.findAll().then(categories => {
                res.render('admin/articles/edit',{article,categories});
            })
        }
    })
})

router.post('/articles/update',(req, res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const slug = slugify(title);
    const body = req.body.body;
    const categoryId = req.body.category;

    articles.update({title,slug,body,categoryId},{
        where: {id}
    }).then(()=>{
        res.redirect('/admin/articles')
    })
})

router.get('/articles/page/:num',(req, res)=>{
    let page = req.params.num;
    let offset;

    if(isNaN(page) || page==1){
        offset = 0;
    }
    else{
        offset = (parseInt(page)-1) * parseInt(page);
    }

    articles.findAndCountAll({
        limit:4,
        offset:offset,
        order:[['id','DESC']]
    }).then(articles=>{

        let next = true;
        if(offset + 4>= articles.count){
            next = false;
        }
        
        const result = {articles,next:next, page:parseInt(page)};
        category.findAll().then(categories=>{
            res.render('admin/articles/page',{result,categories});
        })
        
        
    })
})

module.exports = router;