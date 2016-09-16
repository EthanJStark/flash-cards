const express = require('express')
const router = express.Router()
const Deck = require('../database/db.js').Deck

router.get('/new', ( request, response, next ) => {
  const cards = {}
  response.render('decks/edit', { cards })
})

router.get('/edit/:id', ( request, response, next ) => {
  Promise.all([
    Deck.allCards( request.params.id )
  ])
    .then( result => {
      const cards = result[0]
      response.render('decks/edit', { cards } )
    })
})

router.post('/new', ( request, response, next ) => {
  const title = request.body.title
  Deck.create( title )
    .then( deck_id => response.redirect( `/decks/edit/${deck_id.id}` ))
})

module.exports = router
