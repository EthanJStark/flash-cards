const express = require('express')
const router = express.Router()
const Deck = require('../database/db.js').Deck

// render new deck form
router.get('/create', ( request, response, next ) => {
  const cards = {}
  response.render('deck/create', { cards })
})

// edit deck
router.get('/edit/:id', ( request, response, next ) => {
  Promise.all([
    Deck.allCards( request.params.id ),
    Deck.title( request.params.id )
  ])
    .then( result => {
      const cards = result[0]
      const title = result[1]
      response.render('deck/edit', { cards, title } )
    })
})

// create deck
router.post('/new', ( request, response, next ) => {
  const title = request.body.title
  Deck.create( title )
    .then( deck_id => response.redirect( `/deck/edit/${deck_id.id}` ))
})

// delete deck
router.get('/delete/:id', ( request, response, next ) => {
  Deck.delete( request.params.id )
    .then( deck => response.redirect( '/' ))
})

//Render create card form
router.get('/:id/new', ( request, response, next ) => {
  response.render('cards/edit')
})

//button for saving a new card
//deck/edit/:deckid/card/create
// (`/deck/${id}/new

// create card
router.post('/:id/newCard', ( request, response, next ) => {
  const front = request.body.front
  const back = request.body.back
  const deck_id = request.params.id
  // console.log('deckid', deck_id)

  Card.create( front, back, deck_id )
    .then( x => response.redirect( `/deck/edit/${deck_id.id}` ))
})


module.exports = router
