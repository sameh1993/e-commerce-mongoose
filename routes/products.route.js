const router = require("express").Router();
const {
  getProduct,
  getAddPeoductPage,
  postAddNewProduct,
  getEditProductPage,
  postEditProductPage,
  getProductsByCategory,
  getProductsByPrice,
  getDeleteproduct,
  getcheckoutPage
} = require("../controller/products.controller");

const multer = require("multer");
const bodyParser = require("body-parser");

router.get("/add", getAddPeoductPage);

// category routes 
router.get("/type", bodyParser.urlencoded({ extended: true }), getProductsByCategory)


router.get("/price/:id", getProductsByPrice)

router.post(
  "/add",
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "assets/images/" + req.body.category);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).array("images"),
  postAddNewProduct
);

router.get(
  "/edit/:id",
  bodyParser.urlencoded({ extended: true }),
  getEditProductPage
);


router.post("/edit/:id", 
multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets/images/" + req.body.categories);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
}).array("images"),
postEditProductPage)

router.get("/delete/:id", getDeleteproduct)

router.get("/checkout", getcheckoutPage)

router.get("/:id", getProduct);



module.exports = router;
