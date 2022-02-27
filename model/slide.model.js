const mongoose = require("mongoose")
require("dotenv").config()
const url_DB = process.env.ConnectDB

const sliderSchema = new mongoose.Schema({
    image: {
        type:String,
        trim: true,
        unique: true
    },  
    subTitle: {
        type:String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    productId: {
        type: String,
        trim: true
    }
})


const slider = mongoose.model("slider", sliderSchema)



exports.getSlider = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url_DB).then(() => {
            return slider.find()
        }).then(result => {
            mongoose.connection.close()
            resolve(result)
        }).catch(err => {
            mongoose.connection.close()
            reject(err)
        })
    })
}

exports.insertNewSlide = (data) => {
    // return console.log(data)
    return new Promise((resolve, reject) => {
        
        mongoose.connect(url_DB).then(() => {
            const newSlide = new slider({
                image: data.image,
                subTitle: data.subTitle,
                title: data.title,
                productId: data.productId
            })
            return newSlide.save()
        }).then(result => {
            mongoose.connection.close()
            resolve(result)
        }).catch(err => {
            mongoose.connection.close()
            reject(err)
        })
    })
}

exports.deleteSliderById = (id) => {
        return new Promise((resolve, reject) => {
            mongoose.connect(url_DB).then(() => {
                return slider.deleteOne({ _id: id })
            }).then(result => {
                resolve(result)
            }).catch(err => {
                // mongoose.disconnect()
                reject(err)
            })
        })
}