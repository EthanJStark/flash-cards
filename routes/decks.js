const express = require('express')
const router = express.Router()
const Deck = require('../database/db.js').Deck

router.get('/new', ( request, response, next ) => {
  const cards = {}
  response.render('decks/edit', { cards })
})

router.get('/edit/:id', ( request, response, next ) => {
  Promise.all([
    Deck.allCards( request.params.id ),
    Deck.title( request.params.id )
  ])
    .then( result => {
      const cards = result[0]
      const title = result[1]
      response.render('decks/edit', { cards, title } )
    })
})

router.post('/new', ( request, response, next ) => {
  const title = request.body.title
  Deck.create( title )
    .then( deck_id => response.redirect( `/decks/edit/${deck_id.id}` ))
})

router.get('/delete/:id', ( request, response, next ) => {
  Deck.delete( request.params.id )
    .then( deck => response.redirect( '/' ))
})

module.exports = router
