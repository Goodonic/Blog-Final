const express = require("express");
const mongoose = require('mongoose');
const body_parser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const account = require("./routes/account");
const Post = require("./models/post")
// Name and secret key of your database
const config = require("./config/db");

mongoose.set('strictQuery', false);

const app = express();

const port = 3000;

app.use(cors());
app.use(body_parser.json({limit:'50mb'}));
app.use(body_parser.urlencoded({limit:'50mb', extended: true, parameterLimit: 1000000}));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

mongoose.connect(config.db);
mongoose.connection.on('connected', () => {
    console.log("Successful connection to the database")
});

mongoose.connection.on('error', (err) => {
    console.log("Not successful connection to the database" + err)
});

app.listen(port, ()=>{
    console.log("Server working! Port:" + port)
});

app.get("/:category",  (req, res) => {
    let url = req.url.split('/')
    type = url[1]
    Post.find({category: type}).then(posts => res.json(posts))
});
app.get("/post/:id",  (req, res) => {
    let url = req.url.split('/')
    id = url[2]
    Post.findById(id).then(post => res.json(post))
});
app.delete("/post/:id", (req, res) => {
    let url = req.url.split('/')
    id = url[2]
    Post.deleteOne({_id: id}).then(() => res.json({success: true}))

})
app.use('/account', account);

//app.get("/post/:id/delete", (req => ))