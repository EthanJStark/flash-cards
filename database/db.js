const pgp = require( 'pg-promise' )()
const connection = { database: 'flashcards' }
const db = pgp( connection )

const getAllDecks = 'SELECT * FROM decks'

const newDeck = 'INSERT INTO decks (title) VALUES ($1)'

const newCard = 'INSERT INTO cards (front, back, deck_id) VALUES ($1, $2, $3)'

const deleteCard = 'DELETE FROM cards WHERE id=$1'

const Deck = {
  all: () => db.any( getAllDecks ),
  new: title => db.one( newDeck, [title] )
}

const Card = {
  new: (front, back, id) => db.one( newCard, [front, back, id] ),
  delete: id => db.none( deleteCard, [id] )
}

module.exports = {
  Deck, Card
}
