const classicController = module.exports;

classicController.index = async function (req, res, next) {
    res.render('classic', {
        cards: req.session.cards
    });
}

classicController.generate = async function (req, res, next) {
    req.session.cards = req.session.cards ?? [];

    if (!req.session.availableCards) {
        req.session.availableCards = [];
        for (let i = 0; i < 75; i++) {
            req.session.availableCards[i] = i + 1;
        }
    }

    if (req.session.availableCards.length == 0) return res.json({card: 0});

    const card = req.session.availableCards[Math.floor(Math.random() * req.session.availableCards.length)]; // Select random card
    req.session.cards[req.session.cards.length] = card; // Store generated card
    req.session.availableCards.splice(req.session.availableCards.indexOf(card), 1); // Remove card from array
    res.json({card: card});
}

classicController.clear = async function (req, res, next) {
    req.session.cards = null;
    req.session.availableCards = null;
    res.json({status: 'success'});
}
