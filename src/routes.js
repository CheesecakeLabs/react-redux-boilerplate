import React, { Component, PropTypes } from 'react';
import { Route } from 'react-router';

import Home from './views/home';
import NotFound from './views/not-found';


export default (
  <Route>
    <Route path="/" component={Home} />
    <Route path="*" component={NotFound} />
  </Route>
)
