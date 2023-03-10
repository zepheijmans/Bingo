const gameController = module.exports;

gameController.index = async function (req, res, next) {
    res.render('game');
}
