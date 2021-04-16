const express = require('express');
const router = express.Router();
const category = require('./category');
const slugify = require('slugify')


router.get('/admin/categories/new',(req,res) => {
    res.render('admin/categories/new');
})

router.post("/categories/save",(req,res) => {
    const title = req.body.title
    const slug = slugify(title)
    if(title!=undefined){
        category.create({
            title,
            slug
        }).then(() => {
            res.redirect('/admin/categories');
        })
    }else{
        res.redirect("/admin/categories/new");
    }
})

router.get('/admin/categories',(req,res)=>{
    category.findAll({
        order:[['id','DESC']],
    }).then(categories=>{
        res.render('admin/categories/index',{categories});
    })
    
})

router.post('/categories/delete',(req,res)=>{
    const id = req.body.id;
    if(id!=null){
        if(!isNaN(id)){
            category.destroy({
                where: {id}
            }).then(()=>{
                res.redirect('/admin/categories');
            })
        }else{
            res.redirect('/admin/categories');
        }
    }else{
        res.redirect('/admin/categories');
    }
})

router.get('/admin/categories/edit/:id',(req,res)=>{
    const id = req.params.id; 

    if(isNaN(id)){
        res.redirect('/admin/categories')
    }

    category.findByPk(id).then(category=>{
        if(category!=undefined){
             res.render('admin/categories/edit',{category})
        }else{
            res.redirect('/admin/categories')
        }
    }).catch(erro=>{
        res.redirect('/admin/categories');
    })
})

router.post('/categories/update',(req, res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const slug = slugify(req.body.title);

    category.update({title,slug},{
        where: {id}
    }).then(()=>{
        res.redirect('/admin/categories')
    })
})



module.exports = router;