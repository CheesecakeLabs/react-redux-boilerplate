import React from 'react';
import { Route } from 'react-router';
import {
  App,
  NotFound,
  Counter,
} from './views';


export default (
  <Route component={App}>
    <Route path="/" component={Counter} />
    <Route path="*" component={NotFound} />
  </Route>
);
