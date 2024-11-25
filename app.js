const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session')
const flash = require('connect-flash')

const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js'); 

// MONGO_URL
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};

//Root Route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use(session(sessionOptions));
app.use(flash())

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})


app.use('/listings', listings);
app.use('/listings/:id/reviews', reviews);

//all Routes
app.all("*",(req,res,next)=>{
  let htmlTag = " Page Not Found! :(:( ";
  next(new ExpressError(404,htmlTag));
});

//Middleware Error
app.use((err,req,res,next)=>{
  let {status=500,message="Somthing Went Wrong"} = err;
  res.status(status).render("listings/error.ejs",{status,message});
  // res.status(status).send(message);
});

//Server is Running port (8080)
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });




  // if(!newListing.title){
  //   throw new ExpressError(400,"title is missing");
  // };
  // if(!newListing.description){
  //   throw new ExpressError(400,"description is missing");
  // }
  // if(!newListing.location){
  //   throw new ExpressError(400,"location is missing");
  // }
  // if(!newListing.country){
  //   throw new ExpressError(400,"country is missing");
  // }