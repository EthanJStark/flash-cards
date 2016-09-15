const pgp = require( 'pg-promise' )()
const connection = { database: 'flashcards' }
const db = pgp( connection )

const getAllDecks = 'SELECT * FROM decks'

const newDeck = 'INSERT INTO decks (title) VALUES ($1) RETURNING id'

const newCard = 'INSERT INTO cards (front, back, deck_id) VALUES ($1, $2, $3)'

const deleteCard = 'DELETE FROM cards WHERE id=$1'

const listAllCardsInDeck = 'SELECT * FROM cards WHERE deck_id=$1'

const Deck = {
  create: title => {
    return db.one( newDeck, [title] )
  },
  allDecks: () => db.any( getAllDecks ),
  allCards: id => db.any( listAllCardsInDeck, [id])
}

const Card = {
  create: (front, back, id) => db.one( newCard, [front, back, id] ),
  delete: id => db.none( deleteCard, [id] )
}

module.exports = {
  Deck, Card
}
