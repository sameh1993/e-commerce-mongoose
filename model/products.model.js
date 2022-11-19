const mongoose = require("mongoose");
const { User } = require("./auth.model");
const { DB_url } = require("../config");
require("dotenv").config();

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  description: [],
  price: {
    type: mongoose.Decimal128,
    trim: true,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
  ],
  type: {
    type: String,
    trim: true,
    lowercase: true,
  },
  discount: {
    type: Number,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    maxLength: 50,
    trim: true,
    lowercase: true,
  },
  warranty: Number,
  amount: {
    type: Number,
    required: true,
  },
  about: {
    type: Array,
    default: [],
  },
  accessory: {
    type: Boolean,
    default: false,
    trim: true,
  },
  stars: Number,
  ram: {
    type: String,
    trim: true,
    uppercase: true,
  },
  cashOnDelivery: Boolean, // must be add it to add product page
  previews: [
    {
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      msg: String,
      star: Number,
    },
  ],
}, { timeStramp: true });

const product = mongoose.model("product", productSchema);

exports.product = product;
const URL_DB = process.env.connectDB;

exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.ConnectDB)
      .then(() => {
        return product.findById(id);
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// methos to search in products
exports.searchOnAllProducts = async (name) => {
  try {
    await mongoose.connect(DB_url);
    const getProducts = await product.find({ name: `/${name}/i` });
    return getProducts;
  } catch (error) {
    console.log(error);
  }
};

exports.getProductsByFilter = (filter) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(URL_DB)
      .then(() => {
        return product.find(filter).sort({ _id: -1 }).limit(3);
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// get types product of [ mobiles , computers ]
exports.countProductLengthByCatgeory = (data, filter) => {
  return new Promise((resolve, reject) => {
    const { skip, limit } = data;
    // const filter = {};
    // if (category) {
    //   filter.category = `/${category}/`;
    // } else if (type) {
    //   if (typeof type == object) {
    //     filter.type = { $in: type };
    //   } else {
    //     filter.type = type;
    //   }
    // }
    // if (accessory == "true") {
    //   filter.accessory = accessory;
    // }
    // return console.log(filter, "count");
    mongoose
      .connect(URL_DB)
      .then(() => {
        return product.countDocuments(filter);
      })
      .then((products) => {
        resolve(products);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.fetchProductsByCategory = (data, filter) => {
  return new Promise((resolve, reject) => {
    const { skip, limit } = data;
    mongoose
      .connect(URL_DB)
      .then(() => {
        return product
          .find(filter)
          .limit(limit || 9)
          .skip(skip || 0);
      })
      .then((products) => {
        resolve(products);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// to make group for specfific
exports.distinctBrandByCategory = async (category) => {
  try {
    await mongoose.connect(DB_url);
    const result = await product.find({ category: category }).distinct("brand");
    return result;
  } catch (err) {
    next(err);
  }
};

exports.getAllCategories = async () => {
  try {
    await mongoose.connect(DB_url);
    const allCategories = await product.distinct("category");
    return allCategories;
  } catch (err) {
    console.log(err);
  }
};

// to make group for specific some preperties
exports.distinctBrandByCategoryWithFetchSomePreperty = (category) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(URL_DB)
      .then(() => {
        return product.find({}, { productName: 1, price: 1 }).distinct("brand");
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.insertNewProduct = (data, imageObj) => {
  return new Promise((resolve, reject) => {
    const images = [];
    for (let img of imageObj) {
      images.push(img.filename);
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
      type: data.type,
    });
    mongoose
      .connect(URL_DB)
      .then(() => {
        return newProduct.save();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const fs = require("fs");
const { BlockList } = require("net");

exports.deleteProductById = async (id) => {
  try {
    await mongoose.connect(DB_url);
    const docProduct = await product.findOne({ _id: id });
    const deleteDoc = await product.deleteOne({ _id: id });
    async function removeImage(images) {
      for (let item of images) {
        fs.unlinkSync(
          `assets/images/${docProduct.department}/${item}`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
          }
        );
      }
    }
    await removeImage(docProduct.images);
    return deleteDoc;
  } catch (err) {
    console.log(err);
  }
};
