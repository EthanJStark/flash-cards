const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const Deck = require('../database/db.js').Deck

router.get('/', function(request, response, next) {
  Deck.all()
    .then( decks => response.render('decks/index', { decks } ) )
})

router.get('/decks/new', ( request, response, next ) => {
  response.render('decks/new')
})

router.post('/decks/new', ( request, response, next ) => {
  const title = request.body.title
  Deck.new( title )
    .then( response.render('decks/new') )
})

router.get('/cards/new', ( request, response, next ) => {
  response.render('cards/edit')
})

module.exports = router
