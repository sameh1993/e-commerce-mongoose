// import modules to app js file
const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

// create app
const app = express();

// trigger middlewares
app.use(express.static("assets"));
app.use(express.json());
app.use(cors());

// routes middlewares
const invoiceRoute = require("./routes/invoice.routes");
app.use("/invoice", invoiceRoute);

const storeRoutes = require("./routes/store.routes");
app.use("/store", storeRoutes);

const userRoutes = require("./routes/client.routes");
app.use("/client", userRoutes);

const supplierRoutes = require("./routes/supplier.routes");
app.use("/supplier", supplierRoutes);

const port = process.env.PORT;

const server = app.listen(port, () =>
  console.log(`server working on port ${port}`)
);
