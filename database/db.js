const pgp = require( 'pg-promise' )()
const connection = { database: 'flashcards' }
const db = pgp( connection )

const getAllDecks = 'SELECT * FROM decks'

const newDeck = 'INSERT INTO decks (title) VALUES ($1) RETURNING id'

const newCard = 'INSERT INTO cards (front, back, deck_id) VALUES ($1, $2, $3)'

const deleteDeck = 'DELETE FROM decks WHERE id=$1'
const deleteDeckCards = 'DELETE FROM cards WHERE deck_id=$1'

const deleteCard = 'DELETE FROM cards WHERE id=$1'

const listAllCardsInDeck = 'SELECT * FROM cards WHERE deck_id=$1'

const getDeckTitleById = 'SELECT title FROM decks WHERE id=$1'

const getCardCountById = 'SELECT count (front) FROM cards WHERE deck_id=$1'

const Deck = {
  create: title => {
    return db.one( newDeck, [title] )
  },
  allDecks: () => db.any( getAllDecks ),
  allCards: id => db.any( listAllCardsInDeck, [id] ),
  title: id => db.one( getDeckTitleById, [id] ),
  count: id => db.one( getCardCountById, [id]),
  delete: (id) => Promise.all([
   db.any( deleteDeck, [id] ),
   db.any( deleteDeckCards, [id] )
 ]),
 //Vitaly's code:
 // delete: (id, deck_id) => db.tx(t=>t.batch([
 //   t.any( deleteDeck, [id] ),
 //   t.any( deleteDeckCards, [deck_id] )
 // ]))
}

const Card = {
  create: (front, back, deck_id) => db.any( newCard, [front, back, deck_id] ),
  delete: id => db.none( deleteCard, [id] )
}

module.exports = {
  Deck, Card
}
