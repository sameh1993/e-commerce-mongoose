// import modules to app js file
const express = require("express");
require("dotenv").config();
const path = require("path");
const sessions = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(sessions);
const flash = require("express-flash");
require("express-async-errors");
const apiError = require("./helps/apiError");

// create app
const app = express();

// trigger middlewares
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var store = new MongoDBStore({
  uri: process.env.connectDB,
  collection: "sessions",
});

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    store: store,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(flash());

// routes middlewares
const homeRoutes = require("./routes/home.routes");
app.use("/", homeRoutes);

const mongoose = require("mongoose");
const { getProductById } = require("./model/products.model");

const aboutRoutes = require("./routes/about.routes");
app.use("/about", aboutRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth/", authRoutes);

const productsRoutes = require("./routes/products.route");
app.use("/product", productsRoutes);

const BraintreeApiRoutes = require("./routes/braintree.route");
const { DB_url } = require("./config");
app.use("/api/braintree", BraintreeApiRoutes);

app.use((req, res, next) => {
  // create error and send it to error handling middleware
  const error = new apiError(`Dont found this Route ${req.originalUrl}`, 404);
  next(error);
});

// global error handling middlwware
// to handle error inside express
app.use((err, req, res, next) => {
  // return console.log(err.stack);
  err.statuscode = err.statuscode || 500;
  err.status = err.statuscode == 500 ? "error" : "fail";

  // if (err.statuscode == 500) {
  //   err.message = "wrong server";
  // } else {
  //   err.messsage = err.message;
  // }
  res.send({
    ...err,
    stack: err.stack,
  });
});

const port = process.env.PORT;

const server = app.listen(port, () =>
  console.log(`server working on port ${port}`)
);

// to handle rejections outside exxpress
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors ${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`server is shutdown`);
    process.exit(1);
  });
});
