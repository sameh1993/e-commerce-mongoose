
const mongoose = require("mongoose")
const { DB_url } = require("../config");

const departmentSchmea = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    categories: [{
        categId: mongoose.Schema.Types.ObjectId,
        categName: String,
        types: [{type:String, unique: true}]
    }]
})

const department = mongoose.model("department", departmentSchmea)

exports.insertNewDepartment = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url).then(() => {
            return department.insertMany(data)
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.getAllDepartments = () => {
    return new Promise((resolve,reject) => {
        mongoose.connect(DB_url).then(() => {
            return department.find()
        }).then(result => {
            resolve(result)
        }).catch(err => {
            console.log(err)
        })
    })
}








// department object
// const department = [{
//     name: 'electronices',
//     categories: [
//         { categName: 'computers & accessories', types: ['desktop device', 'protectors', 'laptop', 'printer', 'game zone', 'networking devices'] },
//         { categName: 'mobiles & accessories', types: ['mobile', 'cover', 'power bank', 'headphone'] },
//         { categName: 'tv & audio', types: ['televsion', 'screen', 'phipls speaker'] },
//     ]
// }, {
//     name: "appliances",
//     categories: [
//         { categName: "large appliances", types: ['refrigerator', 'showing machine', 'microwave'] },
//         { categName: "home suppliers", types: ['refrigerator', 'stand fan', 'showing machine top automtic'] }
//     ]
// }
// ]