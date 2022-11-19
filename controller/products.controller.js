const productsModel = require("../model/products.model");
require("express-async-errors");

exports.getSearchForProducts = (req, res, next) => {
  // return console.log(req.query)
  productsModel
    .searchOnAllProducts(req.query.name)
    .then((result) => {
      // return console.log(result)
      productsModel
        .distinctBrandByCategory(result[0].category)
        .then((brands) => {
          if (result.length > 0 && result[0].department == "electronics") {
            res.render("product", {
              isAuth: req.session.userid,
              isAdmin: req.session.isAdmin,

              // param: req.query,
              products: result,
              brands: brands,
            });
          } else if (result.length > 0) {
            res.render("product2", {
              isAuth: req.session.userid,
              isAdmin: req.session.isAdmin,

              // param: req.query,
              products: result,
              brands: brands,
            });
          } else {
            res.render("product2", {
              isAuth: req.session.userid,
              isAdmin: req.session.isAdmin,

              products: result,
            });
          }
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res) => {
  productsModel
    .getProductById(req.params.id)
    .then((result) => {
      res.render("single", {
        isAuth: req.session.userid,
        isAdmin: req.session.isAdmin,
        product: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const { getAllDepartments } = require("../model/departments.model");

exports.getAddPeoductPage = (req, res) => {
  getAllDepartments().then((departments) => {
    res.render("add-product", {
      isAuth: req.session.userid,
      isAdmin: req.session.isAdmin,
      departs: departments,
    });
  });
};

exports.postAddNewProduct = (req, res) => {
  console.log(req.body);
  req.body.category = JSON.parse(req.body.category);
  productsModel
    .insertNewProduct(req.body, req.files)
    .then((result) => {
      console.log(result);
      res.redirect("/product/" + result._id);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProductPage = (req, res) => {
  const id = req.params.id;
  productsModel
    .getProductById(id)
    .then((result) => {
      res.render("edit-product", {
        isAuth: req.session.userid,
        isAdmin: req.session.isAdmin,
        product: result[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProductPage = (req, res) => {
  // return console.log("edit", req.body)
  const id = req.params.id;
  productsModel
    .updateProductById(req.body, req.files, id)
    .then((result) => {
      for (let img of req.body.removeImages) {
        fs.unlink(img, function () {
          console.log("remove", img);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const { getDepartmentByMainParts } = require("../model/departments.model");
exports.getProductsByCategory = async (req, res) => {
  req.query.page = req.query.page || 1;
  req.query.limit = 12;
  req.query.skip = (req.query.page - 1) * req.query.limit;

  const filter = { ...req.query }
  delete filter.limit
  delete filter.skip
  delete filter.page

  const totalLength = await productsModel.countProductLengthByCatgeory(req.query, filter);
  console.log("prodCount", totalLength)
  productsModel
    .fetchProductsByCategory(req.query, filter)
    .then((result) => {
      // console.log("result", result)
      // return console.log(filter);
      productsModel
        .distinctBrandByCategory(req.query.category)
        .then((brands) => {

          if (result.length > 0 && result[0].department === "electronics") {
            console.log(req.query)
            res.render("product", {
              isAuth: req.session.userid,
              isAdmin: req.session.isAdmin,

              param: req.query,
              products: result,
              productLength: totalLength,
              brands: brands,
              query: req.query,
              page: req.query.page,
              department: undefined,
            });
          } else if (result.length > 0) {
            res.render("product2", {
              isAuth: req.session.userid,
              isAdmin: req.session.isAdmin,

              param: req.query,
              products: result,
              productLength: totalLength,
              brands: brands,
              query: req.query,
              page: req.query.page,
            });
          } else {
            getDepartmentByMainParts(req.query.type)
              .then((department) => {
                res.render("product", {
                  isAuth: req.session.userid,
                  isAdmin: req.session.isAdmin,

                  param: req.query,
                  products: result,
                  productLength: totalLength,
                  brands: brands,
                  query: req.query,
                  page: req.query.page,
                  department: undefined,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fetchDataByCateries = (req, res) => {
  productsModel
    .distinctBrandByCategoryWithFetchSomePreperty(req.query.category)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

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
        $lt: 1000,
      };
    } else {
      filter = {
        $gt: 30000,
      };
    }
  }
  const query = JSON.parse(req.query.query);
  const currentFilter = { price: filter, ...query };

  console.log(currentFilter);

  productsModel
    .fetchProductsByCategory(currentFilter)
    .then((result) => {
      productsModel
        .distinctBrandByCategory(req.query.category)
        .then((brand) => {
          res.render("product", {
            isAuth: req.session.userid,
            isAdmin: req.session.isAdmin,
            products: result,
            param: req.query,
            brands: brand,
            department: undefined,
          });
        });
    });
};

exports.getDeleteproduct = (req, res) => {
  productsModel
    .deleteProductById(req.params.id)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getcheckoutPage = (req, res) => {
  res.render("checkout2", {
    isAuth: req.session.userid,
    isAdmin: req.session.isAdmin,
  });
};

// handle filter products from apis
const { product } = require("../model/products.model");
const apiError = require("../helps/apiError")
const mongoose = require("mongoose");
const { DB_url } = require("../config");
exports.getProductsbyFilter = async (req, res, next) => {
  console.log(req.body)
  const filter = { ...req.body }
  delete filter.limit
  delete filter.skip
  delete filter.page
  mongoose.connect(DB_url)
  const products = await product.find(filter).limit(9)
  if (!products) {
    return next(apiError("not found products yet", 404))
  }
  res.status(201).json(products)
};
