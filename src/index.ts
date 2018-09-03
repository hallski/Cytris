import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { Component } from './interfaces'
import { makeCanvasDriver } from 'cycle-canvas'

import { App } from './app'

const main: Component = App

const gameProps = xs.of({
  cellSize: 25,
  cols: 10,
  rows: 20,
  backgroundColor: 'purple'
})

const drivers = {
  DOM: makeDOMDriver('#root'),
  Canvas: makeCanvasDriver('#game', { width: 250, height: 500 }),
  props: () => gameProps
}

run(main, drivers)
