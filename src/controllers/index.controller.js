const indexController = module.exports;

indexController.index = async function (req, res, next) {
    res.render('index');
}
