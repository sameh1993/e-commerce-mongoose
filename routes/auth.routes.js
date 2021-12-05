const router = require("express").Router()
const bodyParser = require("body-parser")
const { postAddNewUser, postLogin, getLogout } = require("../controller/auth.controller")

router.post("/signup", bodyParser.json(), postAddNewUser)

router.post("/login", bodyParser.json(), postLogin)

router.get("/logout", getLogout)


module.exports = router