const { signUp, loginUser } = require("../model/auth.model");

exports.postAddNewUser = (req, res) => {
  signUp(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({
        err: "this email is already existing",
      });
    });
};

exports.postLogin = (req, res) => {
  loginUser(req.body)
    .then((user) => {
      req.session.userid = user[0]._id;
      req.session.isAdmin = user[0].isAdmin;
      res.json({
        id: user[0]._id,
        isAdmin: user[0].isAdmin,
      });
    })
    .catch((err) => {
      res.json({
        err: err,
      });
    });
};

exports.getLogout = (req, res) => {
  req.session.destroy(function () {
    res.json({ msg: "login" });
  });
};
