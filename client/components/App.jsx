import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './Landing';
import User from './User';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Landing} />
          <Route exact path='/user' component={User}/>
          <Route exact path='/projects' component={Landing} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
