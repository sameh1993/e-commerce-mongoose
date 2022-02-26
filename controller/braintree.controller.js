// >> npm install braintree

require("dotenv").config()
const braintree = require("braintree")

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KRY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.getPaymentPage = (req, res) => {
    // return console.log(req.body)

    if(req.session.userid) {
        gateway.clientToken.generate({}, function(err, response) {
            // return console.log(response)
            if (!err) {
                res.render("payment", {
                    isAuth: req.session.userid,
                    clientToken: response.clientToken
                })
            } else {
                res.json({
                    err: err
                })
            }
        })
    } else {
        req.flash("errorMeg", "your must be logged and try again")
        res.redirect("/")
    }
    
}




// api for payment 
exports.postProcessPayment = (req, res, next) => {

    // return console.log(req.body)

    let amountFromClient = req.body.amount
    let nonceFromClient = req.body.paymentMethodNonce

    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err) {
              res.json({ err: err })
          } else {
            res.json(result)
          }
      });

}