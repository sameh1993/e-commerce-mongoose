require("dotenv").config()
const braintree = require("braintree")

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KRY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
  });

exports.getBraintreeToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if(!err) {
            res.json(response.clientToken)
        } else {
            res.json({
                err : err
            })
        }
    })
}