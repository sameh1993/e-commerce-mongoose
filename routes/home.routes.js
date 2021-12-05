const router = require("express").Router()
const homeController = require("../controller/home.controller")
const bodyParser = require("body-parser")
const multer = require("multer")


router.get("/", homeController.getHomepage)

router.get("/price/:id", bodyParser.urlencoded({ extended: true }), homeController.getHomepage)

router.post('/api/filter-product', bodyParser.json(), homeController.updateProductByFilter)

router.get("/contactUs", homeController.getContactUsPage)


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets/images/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})




// slider
const { postAddNewSlide, deleteSlider } = require("../controller/slider.controller")


router.post("/api/slider/add", multer({ storage: storage }).single("image"), postAddNewSlide)

router.get("/api/slider/delete/:id", deleteSlider)



module.exports = router