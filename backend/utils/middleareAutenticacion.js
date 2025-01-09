module.exports = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/v1/usuarios/rutasProtegidas');
    }
};