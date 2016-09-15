const express = require('express')
const router = express.Router()
const Deck = require('../database/db.js').Deck

//render edit / create deck page
router.get('/new', ( request, response, next ) => {
  const cards = {}

  response.render('decks/edit', { cards })
})

//edit page for a specific deck
router.get('/edit/:id', ( request, response, next ) => {
  Deck.allCards( request.params.id )
    .then( cards => response.render('decks/edit', { cards } ) )
})

//button for create a new deck. Need to insert dummy title
router.post('/new', ( request, response, next ) => {
  const title = request.body.title
  const deck_id = 1
  Deck.create( title )
    .then( response.redirect( `/decks/edit/${deck_id}` ) )
})

module.exports = router
