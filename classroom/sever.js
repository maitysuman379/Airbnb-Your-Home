const express = require('express')
const app = express();
const users = require("./routes/user")
const posts = require('./routes/post')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const flash = require('connect-flash')
const path = require('path')

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

const sessionOptions = {secret: "mysupersecretstring", resave: false, saveUninitialized: true}
app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success")
    res.locals.errorMsg = req.flash("error")
    next();
})


app.get("/register",(req,res)=>{
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    req.flash("success","user register successfully")
    if(name==="anonymous"){
        req.flash("error","some error occured");
    }
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    res.locals.successMsg = req.flash("success")
    res.locals.errorMsg = req.flash("error")
    res.render("page.ejs",{name: req.session.name})
})

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you send a request ${req.session.count} times`)
// })

// app.get("/test", (req,res)=>{
//     res.send("test seccessfull");
// })


























// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie('made-in', "india", {signed: true});
//     res.send("Signed cookie send");
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("Verified!");
// })

// app.get("/getcookie",(req,res)=>{
//     res.cookie("Greet","Hello"); 
//     res.cookie("Roll","Devloper");
//     res.cookie("Passion","Coding");
//     res.send("Send you some cookies!");
// })

// app.get("/greet",(req,res)=>{
//     let {name = "anonmous"} = req.cookies;
//     res.send(`hi...${name}!!`)
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies)
//     res.send('Hi i am root!');
// })

// app.use("/users", users);
// app.use("/post", posts);

app.listen(3000,()=>{
    console.log(`server is listen on port 3000`);
})