// to be inserted in each route that we need to protect
module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ msg: 'You are not logged in. '});
    }
}