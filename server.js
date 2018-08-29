const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const path = require("path");
const app = express();

//引入users.js
const users = require("./routes/api/users")
//引入profile.js
const profile = require("./routes/api/profile")
const posts = require("./routes/api/posts")


// DB config
const db = require("./config/keys").mongoURI;

//使用body-parser的中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Connet to mongoDB
mongoose.connect(db)
        .then(()=> console.log("MongoDB Conneted"))
        .catch((err)=> console.log(err))

//使用中间件实现允许跨域
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
})

// passport初始化
app.use(passport.initialize())

require("./config/passport")(passport)

//使用routes
app.use("/api/users", users)
app.use("/api/profile", profile)
app.use("/api/posts", posts)


//访问打包的文件
if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})