const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const Deck = require('../database/db.js').Deck
const Card = require('../database/db.js').Card

router.get('/', function(request, response, next) {
  Deck.all()
    .then( decks => response.render('decks/index', { decks } ) )
})

//render edit / create deck page
router.get('/decks/new', ( request, response, next ) => {
  response.render('decks/edit')
})

//edit page for a specific deck
router.get('/decks/edit/:id', ( request, response, next ) => {
  Deck.list( request.params.id )
  response.render('decks/edit')
})

//button for create a new deck. Need to insert dummy title
router.post('/decks/new', ( request, response, next ) => {
  const title = request.body.title
  Deck.new( title )
    .then( response.render('decks/edit') )
})

//Render edit / create card page
router.get('/cards/new', ( request, response, next ) => {
  response.render('cards/edit')
})

//button for saving a new card
router.post('/cards/new', ( request, response, next ) => {
  const front = request.body.front
  const back = request.body.back
  Card.new( front, back, 1 ) //currently, deck_id is hardcoded
    .then( response.render('decks/edit') ) //should go back to specific deck
})

module.exports = router
