import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from './Nav';
import Landing from './Landing';
import User from './User';
import Projects from './Projects';


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Route exact path='/' component={Landing} />
          <Route exact path='/user' component={User}/>
          <Route exact path='/projects' component={Projects} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
