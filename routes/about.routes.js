const router = require("express").Router()
const aboutController = require("../controller/about.controller")

router.get("/", aboutController.getAboutPage)


module.exports = router