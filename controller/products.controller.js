const productsModel = require("../model/products.model")

const fs = require("fs")


exports.getSearchForProducts = (req, res, next) => {
    productsModel.searchOnAllProducts().then(result => {
        productsModel.distinctBrandByCategory(result[0].category).then(brands => {
            if(["mobiles", "computers"].indexOf(result[0].category) > -1) {
                res.render("product", {
                    isAuth: req.session.userid,
                    isAdmin: req.session.isAdmin,
    
                    // param: req.query,
                    products: result,
                    brands: brands
                })
            } else {
                res.render("product2", {
                    isAuth: req.session.userid,
                    isAdmin: req.session.isAdmin,
    
                    // param: req.query,
                    products: result,
                    brands: brands
                })
            }
        })
       
    }).catch(err => {
        console.log(err)
    })
}

exports.getProduct = (req, res) => {
    // return console.log(req.params.id)
    productsModel.getProductById(req.params.id).then(result => {
        res.render("single", {
            isAuth: req.session.userid,
            isAdmin: req.session.isAdmin,
            product: result
        })
    }).catch(err => {
        console.log(err)
    })
}


exports.getAddPeoductPage = (req, res) => {
    res.render("add-product", {
        isAuth: req.session.userid,
        isAdmin: req.session.isAdmin
    })
}

exports.postAddNewProduct = (req, res) => {
    productsModel.insertNewProduct(req.body, req.files).then(result => {
        console.log(result)
        res.redirect("/product/" + result._id)
    }).catch(err => {
        console.log(err)
    })
}


exports.getEditProductPage = (req, res) => {
    const id = req.params.id
    productsModel.getProductById(id).then(result => {
        res.render("edit-product", {
            isAuth: req.session.userid,
            isAdmin: req.session.isAdmin,

            product: result[0]
        })
    }).catch(err => {
        console.log(err)
    })
}


exports.postEditProductPage = (req, res) => {
    const id = req.params.id
    productsModel.updateProductById(req.body, req.files, id).then(result => {
        for (let img of req.body.removeImages) {
            fs.unlink(img, function() {
                console.log("remove", img)
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

exports.getProductsByCategory = (req, res) => {
    // return console.log(req.query.category)
    productsModel.fetchProductsByCategory(req.query).then(result => {
        productsModel.distinctBrandByCategory(req.query.category).then(brands => {
            // console.log(brands, "brands")
            if (["mobiles", "computers"].indexOf(req.query.category) > -1) {
                res.render("product", {
                    isAuth: req.session.userid,
                    isAdmin: req.session.isAdmin,

                    param: req.query,
                    products: result,
                    brands: brands
                })
            } else {
                res.render("product2", {
                    isAuth: req.session.userid,
                    isAdmin: req.session.isAdmin,

                    param: req.query,
                    products: result,
                    brands: brands
                })
            }

        })
    }).catch(err => {
        console.log(err)
    })
}

exports.fetchDataByCateries = (req, res) => {
    productsModel.distinctBrandByCategoryWithFetchSomePreperty(req.query.category).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.getProductsByPrice = (req, res) => {
    const params = req.params.id;
    let filter = {};
    if (params.includes("&")) {
        const splite = params.split("&");
        filter = {
            $gt: +splite[0],
            $lt: +splite[1],
        };
    } else {
        if (params == 1000) {
            filter = {
                $lt: 1000
            }
        } else {
            filter = {
                $gt: 30000
            }
        }
    }
    const currentFilter = { price: filter }
    productsModel.fetchProductsByCategory(currentFilter).then(result => {
        res.render("product", {
            isAuth: req.session.userid,
            isAdmin: req.session.isAdmin,

            products: result
        })
    })
}


exports.getDeleteproduct = (req, res) => {
    productsModel.deleteProductById(req.params.id).then(result => {
        res.redirect("/")
    }).catch(err => {
        console.log(err)
    })
}


exports.getcheckoutPage = (req, res) => {
    res.render("checkout", {
        isAuth: req.session.userid,
        isAdmin: req.session.isAdmin,
    })
}