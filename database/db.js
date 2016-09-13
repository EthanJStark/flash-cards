const pgp = require( 'pg-promise' )()
const connection = { database: 'flashcards' }
const db = pgp( connection )

const getAllDecks = 'SELECT * FROM decks'

const Decks = {
  all: () => db.any( getAllDecks )
}

module.exports = {
  Decks
}
