const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const Decks = require('../database/db.js').Decks

router.get('/', function(request, response, next) {
  Decks.all()
    .then( decks => response.render('decks/index', { decks } ) )
})

router.get('/decks/new', ( request, response, next ) => {
  response.render('decks/new')
})

router.post('/decks/new', ( request, response, next ) => {
  const title = request.body.title
  Decks.new( title )
    .then( response.render('decks/new') )
})

module.exports = router
