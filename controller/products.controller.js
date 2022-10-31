const productsModel = require("../model/products.model")

exports.getSearchForProducts = (req, res, next) => {
    // return console.log(req.query)
    productsModel.searchOnAllProducts(req.query.name).then(result => {
        // return console.log(result)
        productsModel.distinctBrandByCategory(result[0].category).then(brands => {
            if (result.length > 0 && result[0].department == 'electronics') {
                res.render("product", {
                    isAuth: req.session.userid,
                    isAdmin: req.session.isAdmin,

                    // param: req.query,
                    products: result,
                    brands: brands
                })
            } else if ( result.length > 0 ) {
                res.render("product2", {
                    isAuth: req.session.userid,
                    isAdmin: req.session.isAdmin,

                    // param: req.query,
                    products: result,
                    brands: brands
                })
            } else{
                res.render("product2", {
                    isAuth: req.session.userid,
                    isAdmin: req.session.isAdmin,

                    products: result
                }) 
            }
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.getProduct = (req, res) => {
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

const { getAllDepartments } = require("../model/departments.model")

exports.getAddPeoductPage = (req, res) => {
    getAllDepartments().then(departments => {
        res.render("add-product", {
            isAuth: req.session.userid,
            isAdmin: req.session.isAdmin,
            departs: departments
        })
    })

}

exports.postAddNewProduct = (req, res) => {
    // return console.log(req.body)
    req.body.category = JSON.parse(req.body.category)
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
    // return console.log("edit", req.body)
    const id = req.params.id
    productsModel.updateProductById(req.body, req.files, id).then(result => {
        for (let img of req.body.removeImages) {
            fs.unlink(img, function () {
                console.log("remove", img)
            })
        }
    }).catch(err => {
        console.log(err)
    })
}


exports.getProductsByCategory = async (req, res) => {
    // const { category, type } = req.query
    req.query.page = req.query.page || 1
    req.query.skip = (req.query.page - 1) * req.query.limit
    const totalItem = await productsModel.countProductLengthByCatgeory(req.query)
    // return console.log(totalItem)
    productsModel.fetchProductsByCategoryWithLimit(req.query).then(result => {
        productsModel.distinctBrandByCategory(req.query.category).then(brands => {
            

            if (result.length > 0 && result[0].department === 'electronics') {
                res.render("product", {
                    isAuth: req.session.userid,
                    isAdmin: req.session.isAdmin,

                    param: req.query,
                    products: result,
                    productLength: totalItem,
                    brands: brands,
                    query: req.query,
                    page : req.query.page
                })
            } else if ( result.length > 0 ) {
                res.render("product2", {
                    isAuth: req.session.userid,
                    isAdmin: req.session.isAdmin,

                    param: req.query,
                    products: result,
                    productLength: totalItem,
                    brands: brands,
                    query: req.query,
                    page: req.query.page
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
        productsModel.distinctBrandByCategory(req.query.category).then(brand => {
            res.render("product", {
                isAuth: req.session.userid,
                isAdmin: req.session.isAdmin,
                products: result,
                param: req.query,
                brands:  brand
            })
        })

    })
}


exports.getDeleteproduct = (req, res) => {
    productsModel.deleteProductById(req.params.id).then(result => {
        console.log('controller', result)
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