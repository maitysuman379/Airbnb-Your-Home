const express = require('express')
const router = express.Router();

//Index Post
router.get("/",(req,res)=>{
    res.send("Get For post");
})

//Show Post
router.get("/:id",(req,res)=>{
    res.send("Get For Show post id");
})

//Post Post
router.post("/",(req,res)=>{
    res.send("Post For post");
})

//Delete Post
router.delete("/:id",(req,res)=>{
    res.send("Delete For post id");
})

module.exports = router;