const productsModel = require("../model/products.model")
const { getSlider } = require("../model/slide.model");

exports.getHomepage = (req, res) => {

    const id = req.params.id;
    var filterMobiles = { category: {$in : ["mobiles & accessories"] }};
    var filterTvScreen = { category:{ $in : ["tv & audio"]} };
    var filterHousehold = { category:{ $in:  ["large appliances"] }};

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

    //  return console.log(filterMobiles)

    const { getProductsByFilter }  = require("../model/products.model")

    getProductsByFilter(filterMobiles).then((mobiles) => {
        getProductsByFilter(filterTvScreen).then((tvScreen) => {
            getProductsByFilter(filterHousehold).then((houseHold) => {
                    getSlider().then((slider) => {
                        console.log(req.session.userid, 'isAuth')
                        res.render("index", {
                            isAuth: req.session.userid ,
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
        });

    };


// apis for home page [ Filter by price ]

exports.updateProductByFilter = (req, res) => {

    // return console.log(req.body)

    const mobiles = req.body.filterMobiles;
    const tv = req.body.filterTvScreen;
    const house = req.body.filterHousehold;

    const price = req.body.price
    if (req.body.price) {
        mobiles.price = price
        tv.price = price
        house.price = price
    }

    productsModel
        .getProductsByFilter(mobiles)
        .then((resultMobiles) => {
            productsModel.getProductsByFilter(tv).then((resultTv) => {
                productsModel.getProductsByFilter(house).then((resultHouse) => {
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


exports.getContactUsPage = (req, res) => {
    res.render("contact", {
        isAuth: req.session.userid,
        isAdmin: req.session.isAdmin,
    })
}