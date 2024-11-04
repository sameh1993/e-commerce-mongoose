const router = require("express").Router();
const {
  addClient,
  getClients,
  getClientById,
} = require("../models/client.model.js");
const { addNewSupplier } = require("../models/supplier.model.js");

router.post("/add-client", async (req, res) => {
  // return console.log(req.body);
  if (req.body.type == "client") {
    await addClient(req.body)
      .then((result) => {
        console.log("resolve");
        res.json({ result });
      })
      .catch((err) => {
        console.log("reject");
        res.json({ err });
      });
  } else {
    await addNewSupplier(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

router.get("/get-clients", (req, res) => {
  getClients()
    .then((result) => {
      // return console.log(result);
      res.json({ result: result });
    })
    .catch((err) => {
      // return console.log(err);
      res.json({ err });
    });
});

router.get("/:idclient", async (req, res) => {
  // return console.log(req.params.idclient);
  getClientById(req.params.idclient)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
