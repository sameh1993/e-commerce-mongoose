const router = require("express").Router()

const auth = require("../views/guard/guard.auth")

const { getPaymentPage, postProcessPayment } = require("../controller/braintree.controller")
const bodyParser = require("body-parser")

// const bodyParser = require("body-parser").urlencoded({ extended: true })

router.get("/get-token", getPaymentPage)



// api routes
router.post("/process-payment", bodyParser.json(), postProcessPayment)

module.exports = router