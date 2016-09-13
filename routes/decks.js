const express = require('express')
const router = express.Router()
const Decks = require('../database/db.js').Decks

router.post( '/decks/delete', (request, response) => {
  Decks.delete( request.body.id )
    .then( result => response.redirect( '/' ))
})

module.exports = router
