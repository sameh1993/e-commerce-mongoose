const router = require("express").Router();
const fs = require("fs")
const path = require("path")
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
        console.log(req.body.category)
        const url = path.join(__dirname, "..", "assets", "images", req.body.department)
        if(!fs.existsSync(url)) {
          fs.mkdir(url, err => {
          })
        } else {
          console.log("not found Mobiles")
        }
        cb(null, "assets/images/" + req.body.department);

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
      cb(null, "assets/images/" + req.body.department);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
}).array("images"),
postEditProductPage)

router.get("/delete/:id", getDeleteproduct)

router.get("/:id", getProduct);

router.post("/checkout", getcheckoutPage)

module.exports = router;
