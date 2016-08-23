/* eslint-disable no-unused-vars */
import createReducer from '../../utils/create-reducer';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './actions';


const INITIAL_STATE = 0;

export const counter = createReducer(INITIAL_STATE, {
  [INCREMENT_COUNTER]: (state, action) => state + 1,

  [DECREMENT_COUNTER]: (state, action) => state - 1,
});
