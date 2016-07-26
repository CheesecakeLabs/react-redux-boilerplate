import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter/reducer';


const rootReducer = combineReducers({
  counter,
  routing,
});


export default rootReducer;
