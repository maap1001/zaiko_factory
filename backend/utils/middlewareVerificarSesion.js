module.exports = (req, res, next) => {
    res.locals.usuarioAutenticado = req.session.userId  ? true : false;
    next();
};
