
const router = require("express").Router()
const { getBraintreeToken } = require("../controller/braintree.controller")

router.get("/getToken", getBraintreeToken)

module.exports = router