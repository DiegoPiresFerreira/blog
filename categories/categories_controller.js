const express = require('express');
const router = express.Router();


router.get('/categories',(req,res) => {
    res.send("rOTA DE CATEGORIA");
})

router.get("/admin/categories/new",(req,res) => {

})


module.exports = router;