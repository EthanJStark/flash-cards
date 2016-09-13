const express = require('express')
const router = express.Router()
const Decks = require('../database/db.js').Decks

router.delete( '/delete', (request, response) => {
  console.log(request.body.id)
  Decks.delete( request.body.id )
    .then( result => response.redirect( '/' ))
    .catch( error => console.log( error ))
})

module.exports = router
