const express = require('express')
const router = express.Router()
const Deck = require('../database/db.js').Deck

//render edit / create deck page
router.get('/decks/new', ( request, response, next ) => {
  response.render('decks/edit')
})

//edit page for a specific deck
router.get('/decks/edit/:id', ( request, response, next ) => {
  Deck.allCards( request.params.id )
    .then( response.render('decks/edit') )
})

//button for create a new deck. Need to insert dummy title
router.post('/decks/new', ( request, response, next ) => {
  const title = request.body.title
  Deck.new( title )
    .then( response.render('decks/edit') )
})

module.exports = router
