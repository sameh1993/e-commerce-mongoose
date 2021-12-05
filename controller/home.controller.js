const productModel = require("../model/products.model");
const { getSlider } = require("../model/slide.model");

exports.getHomepage = (req, res) => {

    const id = req.params.id;
    var filterMobiles = { category: "mobiles" };
    var filterTvScreen = { category: "tv, screen" };
    var filterHousehold = { category: "household appliance" };

    var params = req.params.id;

    if (params) {
        if (params.includes("&")) {
            let splitParam = params.split("&");
            filterMobiles.price = { $gte: +splitParam[0], $lte: +splitParam[1] };
            filterTvScreen.price = { $gte: +splitParam[0], $lte: +splitParam[1] };
            filterHousehold.price = { $gte: +splitParam[0], $lte: +splitParam[1] };
        } else {
            if (params <= 1000) {
                filterMobiles.price = { $lte: +params };
                filterTvScreen.price = { $lte: +params };
                filterHousehold.price = { $lte: +params };
            } else if (params >= 6000) {
                filterMobiles.price = { $gte: +params };
                filterTvScreen.price = { $gte: +params };
                filterHousehold.price = { $gte: +params };
            }
        }
    }
    productModel.getProductsByFilter(filterMobiles).then((mobiles) => {
            productModel.getProductsByFilter(filterTvScreen).then((tvScreen) => {
                productModel.getProductsByFilter(filterHousehold).then((houseHold) => {
                    getSlider().then((slider) => {
                        res.render("index", {
                            isAuth: req.session.userid,
                            isAdmin: req.session.isAdmin,

                            mobiles: mobiles,
                            houseapplince: houseHold,
                            tvScreen: tvScreen,
                            priceValue: id || "sameh",
                            slider: slider,
                            types: ["mobile", "handphone"],
                        });

                    });
                });
            });

        })
        .catch((err) => {
            console.log(err);
        });

};

// apis for home page [ Filter by price ]

exports.updateProductByFilter = (req, res) => {

    const mobiles = req.body.filterMobiles;
    const tv = req.body.filterTvScreen;
    const house = req.body.filterHousehold;

    const price = req.body.price
    if (req.body.price) {
        mobiles.price = price
        tv.price = price
        house.price = price
    }

    productModel
        .getProductsByFilter(mobiles)
        .then((resultMobiles) => {
            productModel.getProductsByFilter(tv).then((resultTv) => {
                productModel.getProductsByFilter(house).then((resultHouse) => {
                    res.json({
                        mobiles: resultMobiles,
                        tv: resultTv,
                        houseHold: resultHouse,
                    });
                });
            });
        })
        .catch((err) => {
            res.json({
                error: err,
            });
        });
};