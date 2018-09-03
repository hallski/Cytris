import xs from 'xstream'
import { Stream } from 'xstream'
import { DOMSource, VNode } from '@cycle/dom'

export type Sources = {
  DOM: DOMSource
  Canvas: any
  props: any
}

export type Sinks = {
  DOM: Stream<VNode>
  Canvas: any
}

export type Component = (s: Sources) => Sinks
