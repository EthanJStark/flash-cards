const pgp = require( 'pg-promise' )()
const connection = { database: 'flashcards' }
const db = pgp( connection )

const getAllDecks = 'SELECT * FROM decks'

const newDeck = 'INSERT INTO decks (title) VALUES ($1)'

const Decks = {
  all: () => db.any( getAllDecks ),
  new: title => db.one( newDeck, [title] )
}

module.exports = {
  Decks
}
