const express = require('express')
const router = express.Router()
const Card = require('../database/db.js').Card

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
