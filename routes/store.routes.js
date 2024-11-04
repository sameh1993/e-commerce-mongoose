const router = require("express").Router();
const {
  addNewItem,
  getAllItems,
  getItemById,
} = require("../models/store.model.js");

router.get("/all-items", (req, res) => {
  getAllItems()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      res.json({ err });
    });
});

router.post("/add-item", async (req, res) => {
  // return console.log(req.body);
  await addNewItem(req.body)
    .then((result) => {
      // return console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.json({ err });
    });
});

router.get("/:iditem", async (req, res) => {
  await getItemById(req.params.iditem)
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((err) => {
      res.json({ err });
    });
});

module.exports = router;
