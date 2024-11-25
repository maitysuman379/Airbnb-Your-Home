const express = require('express')
const router = express.Router();


//Index Users
router.get("/",(req,res)=>{
    res.send("Get For users");
})

//Show Users
router.get("/:id",(req,res)=>{
    res.send("Get For Show users id");
})

//Post Users
router.post("/",(req,res)=>{
    res.send("Post For users");
})

//Delete Users
router.delete("/:id",(req,res)=>{
    res.send("Delete For users id");
})

module.exports = router;