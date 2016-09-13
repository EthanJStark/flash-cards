const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const Decks = require('../database/db.js').Decks

/* GET home page. */
router.get('/', function(req, res, next) {
  Decks.all()
    .then( decks => res.render('decks/index', { decks } ) )
})

router.get('/decks/new', ( req, res, next ) => {
  res.render('decks/new')
})

router.post('/decks/new', ( req, res, next ) => {
  const title = req.body.title
  console.log('title', req.body.title);
  Decks.new( title )
    .then( res.render('decks/new') )
})

module.exports = router
