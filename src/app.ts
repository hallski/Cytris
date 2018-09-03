import xs from 'xstream'
import { Sources, Sinks } from './interfaces'
import { rect } from 'cycle-canvas'
import { div } from '@cycle/dom'

const keysOfInterest = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']

export function App(sources: Sources & { props: any }): Sinks {
  const props$ = sources.props

  const keyDown$ = sources.DOM.select('document')
    .events('keydown')
    .map(ev => (ev as KeyboardEvent).key)

  const keyUp$ = sources.DOM.select('document')
    .events('keyup')
    .map(ev => (ev as KeyboardEvent).key)

  const keys$ = xs
    .merge(keyDown$, keyUp$)
    .filter(key => keysOfInterest.includes(key))
    .startWith('')

  const vtree$ = keys$
    .map(key => {
      console.log(key)
      return key
    })
    .map(key => div([`${key} pressed`]))
    .startWith(div(['hello'])) //xs.of(div(['My Awesome Cycle.js app']))

  const canvas$ = props$.map((props: any) =>
    rect({
      x: 0,
      y: 0,
      width: props.cellSize * props.cols,
      height: props.cellSize * props.rows,
      draw: [{ fill: props.backgroundColor }]
    })
  )

  return {
    DOM: vtree$,
    Canvas: canvas$
  }
}
