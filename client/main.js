const deckClicked = event => {
  console.log( event )
}

const deckMouseover = event => {
  console.log( event )
}

Array.from( document.getElementsByClassName( 'deck' ) )
  .forEach( element => element.addEventListener( 'click', deckClicked ))

Array.from( document.getElementsByClassName( 'deck' ) )
  .forEach( element => element.addEventListener( 'mouseover', deckMouseover ))