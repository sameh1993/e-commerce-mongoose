const router = require("express").Router()

const { getPaymentPage, postProcessPayment } = require("../controller/braintree.controller")
const bodyParser = require("body-parser")

// const bodyParser = require("body-parser").urlencoded({ extended: true })

router.get("/get-token", getPaymentPage)



// api routes
router.post("/process-payment", bodyParser.json(), postProcessPayment)

module.exports = router