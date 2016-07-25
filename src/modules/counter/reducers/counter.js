/* eslint-disable no-unused-vars */
import createReducer from '../../../utils/createReducer';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants';


const INITIAL_STATE = 0;

const counter = createReducer(INITIAL_STATE, {
  [INCREMENT_COUNTER]: (state, action) => state + 1,

  [DECREMENT_COUNTER]: (state, action) => state - 1,
});


export default counter;
