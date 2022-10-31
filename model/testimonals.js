
const { Schema, model }  = require("mongoose")


const testimonilsSchema = Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comment : {
        type: String,
        trim: true
    }
})



const testimonils = model('Testimonil', testimonilsSchema)

exports.testimonils = testimonils