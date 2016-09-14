const findParentId = element => {
  let target = element.parentNode
  let id = element.dataset.id

  while( id === undefined && target != undefined ) {
    id = target.dataset.id
    target = target.parentNode
  }

  return id
}

const deckClicked = event => {
  const id = findParentId( event.target )

  window.location = `/deck/${id}`
}

const timer = (() => {
  const ids = {}

  return {
    timeout: (id, fn, time=2000) => ids[ id ] = window.setTimeout( fn, time ),
    cancel: id => ids[ id ] !== undefined ? window.clearTimeout( ids[ id ] ) : ''
  }
})()

const deckMouseover = event => {
  const id = findParentId( event.target )
  const wrapper = event.target.querySelector( '.toggle-wrapper' )

  if( wrapper ) {
    timer.cancel( id )

    wrapper.style.display = 'block'
    timer.timeout( id, () => wrapper.style.display = 'none' )
  }
}

Array.from( document.getElementsByClassName( 'deck' ) )
  .forEach( element => element.addEventListener( 'click', deckClicked ))

Array.from( document.getElementsByClassName( 'deck' ) )
  .forEach( element => element.addEventListener( 'mouseover', deckMouseover ))

