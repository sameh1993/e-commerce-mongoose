
const mongoose = require("mongoose")
require("dotenv").config()

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    description: [],
    price : {
        type: Number,
        trim: true,
        required: true
    },
    images : {
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

const product = mongoose.model("product", productSchema)
const URL_DB = process.env.connectDB

exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.connectDB).then(() => {
            return product.findById( {_id: id})
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.getProductsByFilter = (filter) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(URL_DB).then(() =>{
            return product.find(filter).sort({ _id: -1 }).limit(3)
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

// get types product of [ mobiles , computers ]
exports.fetchProductsByCategory = (data) =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.connectDB).then(() => {
            return product.find( data )
        }).then(products => {
            resolve(products)
        }).catch(err => {
            reject(err)
        })
    })
}

// to make group for specfific
exports.distinctBrandByCategory = ( category ) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(URL_DB).then(() => {
            return product.find( { category: category }).distinct("brand")
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.insertNewProduct = (data, imageObj) => {
    return new Promise((resolve, reject) => {
        const images = []
        for(let img of imageObj) {
            images.push(img.filename)
        }
        const newProduct = new product({
            productName: data.productName,
            category: data.category,
            description: data.description,
            price: +data.price,
            amount : +data.amount,
            discount: +data.discount,
            brand: data.brand,
            images: images,
            warranty: +data.warranty,
            about: data.about,
            type: data.type
        })
        mongoose.connect(process.env.connectDB).then(() => {
            return newProduct.save()
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}


exports.deleteProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.connectDB, () => {
            return product.deleteOne({ _id: id })
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    }).catch(err => {
        reject(err)
    })
}


