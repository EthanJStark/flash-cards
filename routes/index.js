const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const Decks = require('../database/db.js').Decks

/* GET home page. */
router.get('/', function(req, res, next) {
  const decks = Decks.all
  console.log("decks.all", decks);
  res.render('decks/index', { 
    header: 'Decks',
    decks: decks
  })
})

module.exports = router
