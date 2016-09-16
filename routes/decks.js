const express = require('express')
const router = express.Router()
const Deck = require('../database/db.js').Deck

router.get('/new', ( request, response, next ) => {
  const cards = {}
  response.render('decks/edit', { cards })
})

router.get('/edit/:id', ( request, response, next ) => {
  Deck.allCards( request.params.id )
    .then( cards => response.render('decks/edit', { cards } ))
})

router.post('/new', ( request, response, next ) => {
  const title = request.body.title
  Deck.create( title )
    .then( deck_id => response.redirect( `/decks/edit/${deck_id.id}` ))
})

router.put('/edit/:id', (  request, response, next ) => {
  const title = request.body.title
  console.log('put route');
  // const id = request.params.id
  let id = 1;

  Deck.editName( id, title)
    .then( deck_id => response.redirect( `/decks/edit/1` ))
})

module.exports = router
