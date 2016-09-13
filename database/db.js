const pgp = require( 'pg-promise' )()
const connection = { database: 'flashcards' }
const db = pgp( connection )

const getAllDecks = 'SELECT * FROM decks'

const deleteDeck = 'DELETE FROM decks where id=$1'
const deleteDeckCards = 'DELETE FROM cards WHERE deck_id=$1'

const Decks = {
  all: () => db.any( getAllDecks ),
  delete: id => Promise.all([
    db.any( deleteDeck, [id] )
  ])
}

module.exports = {
  Decks
}

// 
// db.any( deleteDeckCards, [id] )
