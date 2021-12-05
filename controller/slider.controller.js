
const { getSlider, insertNewSlide, deleteSliderById } = require("../model/slide.model")

exports.getSlider = (req, res) => {
    getSlider().then(result => {
        res.json()
    })
}

exports.postAddNewSlide = (req, res) => {
    insertNewSlide(req.body).then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
}

exports.deleteSlider = (req, res) => {
    // return console.log(req.params.id)
    deleteSliderById(req.params.id).then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
}