import { defineAction } from '../../utils/define-action'

export const INCREMENT_COUNTER = defineAction('INCREMENT_COUNTER')
export const DECREMENT_COUNTER = defineAction('DECREMENT_COUNTER')

export const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
})

export const decrementCounter = () => ({
  type: DECREMENT_COUNTER,
})
