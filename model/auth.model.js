const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  isAdmin: {
    type: Number,
    default: 0,
  },
  phoneNo: {
    type: String,
    trim: true
  },
  address: {
    streat: {
      type: String,
      trim: true
    },
    landmark: {
      type: String,
      trim: true
    },
    addressName: {
      type: String,
      trim: true
    }
  }
});

const User = mongoose.model("User", userSchema);

exports.signUp = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.ConnectDB)
      .then(() => {
        return User.findOne({ email: data.email });
      })
      .then((user) => {
        if (user) {
          console.log(user);
          mongoose.disconnect();
          reject("this email is exising");
        } else {
          const hashingTest = 10;
          bcrypt.hash(data.password, hashingTest, function (err, hash) {
            const newUser = new User({
              name: data.name,
              email: data.email,
              password: hash,
              isAdmin: 0,
            });
            return newUser
              .save()
              .then((result) => {
                resolve(result);
              })
              .catch((err) => {
                reject(err);
              });
          });
        }
      });
  });
};

exports.loginUser = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.connectDB)
      .then(() => {
        return User.find({ email: data.email });
      })
      .then((user) => {
        // return console.log(user)
        if (user.length <= 0) {
          mongoose.disconnect();
          reject("there is not found");
        } else {
          bcrypt.compare(data.password, user[0].password, function (err, result) {
            if (!err) {
              mongoose.disconnect()
              resolve(user)
            } else {
              console.log(err)
            }
          });
        }
      });
  });
};



exports.updateDataUser = (userid, data) => {
  console.log(data)
  try {
    const updateDataUser = User.updateOne({ _id: userid }, {
      $set: {
        phoneNo: data.phoneNo,
        address: {
          street: data.street,
          landmark: data.landmark,
          addressType: data.addressType
        }
      }
    })
    return updateDataUser
  } catch (err) {
    console.log(err)
  }
}