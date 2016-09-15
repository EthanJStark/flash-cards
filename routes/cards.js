const express = require('express')
const router = express.Router()
const Card = require('../database/db.js').Card

//Render edit / create card page
router.get('/new', ( request, response, next ) => {
  response.render('cards/edit')
})

//button for saving a new card
router.post('/new', ( request, response, next ) => {
  const front = request.body.front
  const back = request.body.back

  const deck_id = 1

  Card.create( front, back, deck_id )
    .then( deck => response.render( 'decks/edit', deck ) ) //should go back to specific deck
})

module.exports = router
