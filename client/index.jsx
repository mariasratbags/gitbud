import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import User from './components/User';

import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route component={App} />
      <Route path='/user' component={User} />
    </div>
  </BrowserRouter>, document.getElementById('root'));
