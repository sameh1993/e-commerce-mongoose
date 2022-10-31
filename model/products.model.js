
const mongoose = require("mongoose")
const { User } = require("./auth.model")
const { DB_url } = require("../config")
require("dotenv").config()

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    description: [],
    price: {
        type: mongoose.Decimal128,
        trim: true,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        trim: true,
        required: true
    }],
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
    },
    accessory: {
        type: Boolean,
        default: false
    },
    customersVote: [
        {
            userid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            msg: {
                type: String,
                trim: true,
            },
            Star: Number,
            date: {
                type: Date,
                default : new Date()
            }
        }
    ]

})

const product = mongoose.model("product", productSchema)

exports.product = product
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

// methos to search in products
exports.searchOnAllProducts = async (name) => {
    try {
        await mongoose.connect(DB_url)
        const getProducts = await product.find({ name: `/${name}/i`  })
        return getProducts
    } catch (error) {
        console.log(error)
    }
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
exports.countProductLengthByCatgeory = (data) => {
    console.log(data)
    const { category, type } = data
    return new Promise((resolve, reject) => {
        mongoose.connect(URL_DB).then(() => {
            return product.find({
                category: category,
                type: type
            }).countDocuments()
        }).then(products => {
            // return console.log(products)
            resolve(products)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.fetchProductsByCategoryWithLimit = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(URL_DB).then(() => {
            return product.find(data).limit(data.limit).skip(data.skip)
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

exports.getAllCategories = async () => {
    try {
        const allCategories = await product.find({}, { category: "mobiles" }).distinct("category")
        return allCategories
    } catch (err) {
        console.log(err)
    }
}

// to make group for specific some preperties
exports.distinctBrandByCategoryWithFetchSomePreperty = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(URL_DB).then(() => {
            return product.find({}, { productName: 1, price: 1 }).distinct("brand")
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
            department: data.department,
            category: data.category,
            description: data.description,
            price: (+data.price).toFixed(2),
            amount: +data.amount,
            discount: +data.discount,
            brand: data.brand,
            images: images,
            warranty: +data.warranty,
            about: data.about,
            type: data.type
        })
        mongoose.connect(URL_DB).then(() => {
            return newProduct.save()
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

const fs = require("fs")
const path = require("path")
const util = require("util")
const { connect } = require("http2")

exports.deleteProductById = async (id) => {
    try {
        await mongoose.connect(DB_url)
        const docProduct = await product.findOne({ _id: id })
        const deleteDoc = await product.deleteOne({ _id: id })
        async function removeImage(images) {
            for (let item of images) {
                fs.unlinkSync(`assets/images/${docProduct.department}/${item}`, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(result)
                })
            }
        }
        await removeImage(docProduct.images)
        return deleteDoc
    } catch (err) {
        console.log(err)
    }
}

// exports.addNewVote = async (id) => {
//     await mongoose.connect(DB_url)
//     await product.updateMany({ _id: id}, { $push: { customersVote: [ { voteId:  } ]  } } )
// }