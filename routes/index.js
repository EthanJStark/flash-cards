const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const Decks = require('../database/db.js').Decks

/* GET home page. */
router.get('/', function(req, res, next) {
  Decks.all()
    .then( decks => res.render('decks/index', { decks } ) )
})

router.get('/decks/new', (req, res, next ) => {
  res.render('decks/edit')
})

module.exports = router
