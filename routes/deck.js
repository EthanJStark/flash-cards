const express = require('express')
const router = express.Router()
const Deck = require('../database/db.js').Deck
const Card = require('../database/db.js').Card

// render new deck form
router.get('/createDeck', ( request, response, next ) => {
  cards = {}
  response.render('deck/create', { cards })
})

// create deck
router.post('/createDeck', ( request, response, next ) => {
  const title = request.body.title
  Deck.create( title )
    .then( deck_id => {
      response.redirect( `/deck/edit/${deck_id.id}`)
    })
})
// edit deck page after creating deck
router.get('/edit/:id', ( request, response, next ) => {
  const deck_id = request.params.id
  Promise.all([
    Deck.allCards( deck_id ),
    Deck.title( deck_id )
  ])
    .then( result => {
      const cards = result[0]
      const title = result[1]
      response.render('deck/edit', { cards, title } )
    })

  // const deck_id = request.params.id
  // console.log(deck_id);
  // const front = 'default front'
  // const back = 'default back'
  // Promise.all([
  //   Deck.allCards( deck_id ),
  //   Deck.title( deck_id ),
  //   Card.create( front, back, deck_id)
  // ])
  //   .then( result => {
  //     const cards = result[0]
  //     const title = result[1]
  //     const extra = result[3]
  //     response.render('deck/edit', { cards, title, extra } )
  //   })
})

router.get('/study/:id', ( request, response, next ) => {
  //cards[0] of whichever deck is clicked
  const deck_id = request.params.id
  Promise.all([
    Deck.allCards( deck_id ),
    Deck.title( deck_id )
  ])
    .then( result => {
      const cards = result[0]
      const title = result[1]
      response.render('deck/study', { cards, title } )
    })
})
// //Render create card form
// router.get('/:id/new', ( request, response, next ) => {
//   response.render('cards/edit')
// })

//button for saving a new card
//deck/edit/:deckid/card/create
// (`/deck/${id}/new

// create card
//deck/edit/:id/newCard
// router.post('/edit/:id/newCard', ( request, response, next ) => {
//   console.log('id before const');
//
//   const front = request.body.front
//   console.log('front', front);
//   const back = request.body.back
//   console.log('back', back);
//   const deck_id = 100
//   //console.log('deckid', deck_id)
//
//   Card.create( front, back, deck_id )
//     .then( id => response.redirect( `/deck/edit/id` ))
// })



//button for saving a new card
// /edit/:deckid/card/create
router.post('/edit/:id/newCard', ( request, response, next ) => {
  const front = request.body.front
  console.log(front);
  const back = request.body.back
  console.log(back);
  const deck_id = request.params.id
  console.log(deck_id);

  Card.create( front, back, deck_id )
    .then( deck_id => response.redirect( `/deck/edit/${deck_id.id}` )) //should go back to specific deck
})

router.get('/edit/:id/newCard', (request, response, next) => {
  const deck_id = request.params.id
  console.log(deck_id);
  const front = 'default front'
  const back = 'default back'
  Promise.all([
    Deck.allCards( deck_id ),
    Deck.title( deck_id ),
    Card.create( front, back, deck_id)
  ])
    .then( result => {
      const cards = result[0]
      const title = result[1]
      const card = result[3]
      response.render('deck/edit', { cards, title, card } )
    })
})


// router.post('/edit/:id', ( request, response, next ) => {
//   const front = request.body.front
//   const back = request.body.back
//   const deck_id = request.params.id
//   console.log('deckid', deck_id)
//
//   Card.create( front, back, deck_id )
//     .then( x => response.redirect( `/deck/edit/${deck_id.id}` ))
// })

// delete deck
router.get('/delete/:id', ( request, response, next ) => {
  const deck_id = request.params.id
  Deck.delete( deck_id )
    .then( deck => response.redirect( '/' ))
})




module.exports = router
