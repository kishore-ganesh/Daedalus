const express = require("express");
const app = express();
const routes = require("./routes.js");
const database = require("./database");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// database.initializeDatabase("postsdb").then(()=>{
app.use(express.static("build"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "blog" }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);
app.get("/", (req, res) => {
  res.sendFile("build/index.html");
});

app.listen(4000);
