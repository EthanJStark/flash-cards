const express = require('express')
const router = express.Router()
const Deck = require('../database/db.js').Deck

router.get('/', function(request, response, next) {
  Deck.allDecks()
    .then( decks => response.render('deck/index', { decks } ) )
})

module.exports = router
