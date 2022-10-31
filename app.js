// import modules to app js file
const express = require("express");
require("dotenv").config()
const path = require("path")
const sessions = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(sessions)
const flash = require("express-flash")

// create app 
const app = express()





// trigger middlewares
app.use(express.static(path.join(__dirname, "assets")))
app.use(express.static(path.join(__dirname, "node_modules")))
app.use(express.static(path.join(__dirname, "views")))
app.use(express.static("assets"))
app.set("view engine", 'ejs')

var store = new MongoDBStore({
  uri: process.env.connectDB,
  collection: 'sessions'

});

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  store: store,
  cookie: { maxAge: oneDay },
  resave: false

}));
app.use(flash())

// routes middlewares
const homeRoutes = require("./routes/home.routes")
app.use("/", homeRoutes)

const aboutRoutes = require("./routes/about.routes")
app.use("/about", aboutRoutes)

const authRoutes = require("./routes/auth.routes")
app.use("/api/auth/", authRoutes)

const productsRoutes = require("./routes/products.route");
app.use("/product", productsRoutes)

const BraintreeApiRoutes = require("./routes/braintree.route");
app.use("/api/braintree", BraintreeApiRoutes)



const port = process.env.PORT

app.listen(port, () => console.log(`server working on port ${port}`))