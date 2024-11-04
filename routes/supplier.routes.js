const { getAllSupplier } = require("../models/supplier.model");


const router = require("express").Router()

router.get("/get-suppliers", (req, res) => {
    getAllSupplier()
      .then((result) => {
        res.json({ result: result });
      })
      .catch((err) => {
        res.json({ err });
      });
  });

module.exports = router