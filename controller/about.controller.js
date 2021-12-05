exports.getAboutPage = (req, res) => {
    // return console.log('sameh sayed')
    res.render("about", {
        isAuth: req.session.userid,
        isAdmin: req.session.isAdmin
    })
}