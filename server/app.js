const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config({ path: "./config.env" });
require('./db/conn');
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors(
  {
    origin: ["https://mern-taupe-nine.vercel.app"],
    post: ["POST", "GET"],
    optionsSuccessStatus: 200,
))

app.use(require("./router/auth"));


app.get('/',(req,res)=>{
    res.send("welcome to the home page from app");
})
// app.get('/about',(req,res)=>{
//     res.send("welcome to the about page");
// })

// app.get('/signin',(req,res)=>{
//     res.send("welcome to the signin page");
// })
// app.get('/signup',(req,res)=>{
//     res.send("welcome to the signup page");
// })


// Step 3 -Heroku

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path= require("path");
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, 'client','build','index.html'));
      });
}

app.listen(PORT, () => { console.log(`app running on port ${PORT}`); });