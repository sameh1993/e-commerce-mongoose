const router = require("express").Router();
const {
  addInvoice,
  getInvoicebyClient,
  addPermission,
} = require("../models/invoice.model");
const { pushInvoiceItems, getInvoiceItems } = require("../models/moveitem.model");

router.post("/add-invoice", async (req, res, next) => {
  // return console.log(req.body);

  if (req.body.type == "client") {
    // create new invoice and get invoiceid
    const result = await addInvoice(req.body);
    const invoiceid = result[0].insertId;
    // send to push records invoice items
    pushInvoiceItems(invoiceid, req.body.items)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {

    const result = await addPermission(req.body);
    const invoiceid = result[0].insertId;
    // send to push records invoice items
    pushPermissionItems(invoiceid, req.body.items)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

router.get("/get-invoice/:clientid", (req, res) => {
  // return console.log(req.params.clientid)
  getInvoicebyClient(req.params.clientid)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/invoiceitem/:idinvoice", (req, res) => {
  getInvoiceItems(invoiceid).then(result => {
      res.json(result)
  }).catch(err => {
    res.json(err)
  })
})

router.get("/:idInvoice", (req, res) => {
   console.log(req.query.idInvoice)
})

module.exports = router;
