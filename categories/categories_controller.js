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
            res.redirect('/');
        })
    }else{
        res.redirect("/admin/categories/new");
    }
})


module.exports = router;