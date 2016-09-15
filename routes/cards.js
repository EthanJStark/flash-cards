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
  const deck = {}

  Card.create( front, back, deck_id )
    .then( response.redirect( `/decks/edit/${deck_id}` ) )
})

module.exports = router
