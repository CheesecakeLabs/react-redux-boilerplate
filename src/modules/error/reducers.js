import { Map, fromJS } from 'immutable'

import { getActionName } from '../../utils/actions'

const INITIAL_STATE = new Map()

export const error = (state = INITIAL_STATE, action) => {
  if (action.error) {
    return state.set(getActionName(action.type), fromJS(action.payload))
  }
  return state.delete(getActionName(action.type))
}
