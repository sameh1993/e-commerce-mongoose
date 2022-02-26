const mongoose = require("mongoose")
require("dotenv").config()

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    description: [],
    price: {
        type: Number,
        trim: true,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true
    },
    discount: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        maxLength: 50
    },
    warranty: Number,
    amount: {
        type: Number,
        required: true,
    },
    about: {
        type: Array,
        default: []
    },
    timeStramp: {
        type: Date,
        default: Date.now()
    }

})


// methos to search in products
exports.searchOnAllProducts = ( name ) => {
    try {
        const getProducts = product.findMany({ name: { $regex: name } })
        return getProducts
    } catch (error) {
        console.log(error)
    }
}

const product = mongoose.model("product", productSchema)
const URL_DB = process.env.connectDB

exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(URL_DB).then(() => {
            return product.findById({ _id: id })
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.getProductsByFilter = (filter) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(URL_DB).then(() => {
            return product.find(filter).sort({ _id: -1 }).limit(3)
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

// get types product of [ mobiles , computers ]
exports.fetchProductsByCategory = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(URL_DB).then(() => {
            return product.find(data)
        }).then(products => {
            resolve(products)
        }).catch(err => {
            reject(err)
        })
    })
}

// to make group for specfific
exports.distinctBrandByCategory = async (category) => {
    try {
        const result = await product.find({ category: category }).distinct("brand")
        return result
    } catch (err) {
        reject(err)
    }
}


exports.getAllCategories = async () =>{
    try {
        const allCategories = await product.find({}, {category: "mobiles"}).distinct("category")
        return allCategories
    } catch ( err)  {
        console.log(err)
    }
}

// to make group for specific some preperties
exports.distinctBrandByCategoryWithFetchSomePreperty = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(URL_DB).then(() => {
            return product.find({ }, { productName: 1, price: 1 }).distinct("brand")
        }).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    })
}



exports.insertNewProduct = (data, imageObj) => {
    return new Promise((resolve, reject) => {
        const images = []
        for (let img of imageObj) {
            images.push(img.filename)
        }
        const newProduct = new product({
            productName: data.productName,
            category: data.category,
            description: data.description,
            price: +data.price,
            amount: +data.amount,
            discount: +data.discount,
            brand: data.brand,
            images: images,
            warranty: +data.warranty,
            about: data.about,
            type: data.type
        })
        mongoose.connect(URL_DB).then(() => {
            // return console.log(newProduct)
            return newProduct.save()
        }).then(result => {
            // return console.log(result.code)
            resolve(result)

        }).catch(err => {
            reject(err)
        })
    })
}


exports.deleteProductById = (id) => {
    return new Promise((resolve, reject) => {
        // return console.log(URL_DB)
        mongoose.connect(URL_DB, () => {
            return product.deleteOne({ _id: id }).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    })
}