const express = require('express')
const app = express();
const users = require("./routes/user")
const posts = require('./routes/post')

app.get("/",(req,res)=>{
    res.send('Hi i am root!');
})

app.use("/users", users);
app.use("/post", posts);

app.listen(3000,()=>{
    console.log(`server is listen on port 3000`);
})