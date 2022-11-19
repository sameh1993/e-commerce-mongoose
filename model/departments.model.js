const mongoose = require("mongoose");
const { DB_url } = require("../config");

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
  },
  categories: [
    {
      categId: mongoose.Schema.Types.ObjectId,
      categName: String,
      types: [{ type: String, unique: true }],
    },
  ],
});

const department = mongoose.model("department", departmentSchema);

exports.insertNewDepartment = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_url)
      .then(() => {
        return department.insertMany(data);
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.getAllDepartments = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_url)
      .then(() => {
        return department.find();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// get department by category
exports.getDepartmentByMainParts = (device) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_url)
      .then(() => {
        return department.findOne({ mainParts: device }, { department: 1 });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const departmentsObject = [
  {
    _id: "6366e5ee42cf14eddf4ea826",
    name: "electronics",
    categories: [
      {
        types: [],
        _id: "637229a9defa242b78c5a3ce",
        categName: "Mobiles & accessories",
        parts: [
          "mobile",
          "cover",
          "screen protector",
          "mobile charger",
          "power bank",
        ],
      },
      {
        types: [],
        _id: "637229a9defa242b78c5a3cf",
        categName: "computers & accessories",
        parts: [
          "laptop",
          "desktop device",
          "laptop charger",
          "network devices",
        ],
      },
      {
        types: [],
        _id: "637229a9defa242b78c5a3d0",
        categName: "apple & iphone",
        parts: ["apple", "iphone", "iphone charger", "apple charger"],
      },
      {
        types: [],
        _id: "637229a9defa242b78c5a3d1",
        categName: "tv & audio",
        parts: ["speaker", "screen"],
      },
      {
        types: [],
        _id: "637229a9defa242b78c5a3d2",
        categName: "printer & ink",
        parts: ["printer", "ink"],
      },
      {
        types: [],
        _id: "637229a9defa242b78c5a3d3",
        categName: "cameras & accessories",
        parts: ["camera"],
      },
      {
        types: [],
        _id: "637229a9defa242b78c5a3d4",
        categName: "ipad & tablets",
        parts: ["ipad", "tablet"],
      },
    ],
    mainParts: [
      "mobile",
      "cover",
      "screen protector",
      "mobile charger",
      "power bank",
      "laptop",
      "desktop device",
      "laptop charger",
      "network device",
      "apple",
      "iphone",
      "iphone charger",
      "apple charger",
      "headphone",
      "speaker",
      "camera",
      "printer",
      "ink",
      "tablet",
      "screen",
      "piano",
      "yamahe",
      "trinity",
      "flaute",
      "kalimba",
      "mouse",
    ],
  },
  {
    _id: "6366eaf442cf14eddf4ea82d",
    name: "appliances",
    categories: [
      {
        types: [],
        _id: "637229a9defa242b78c5a3d5",
        categName: "large appliances",
        parts: ["refrigerator", "dishwacher", "wisher machine"],
      },
    ],
    mainParts: ["refrigerator", "dishwasher", "wisher machine"],
  },
];
