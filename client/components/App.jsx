import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from './Nav';
import Landing from './Landing';
import UserList from './UserList';
import ProjectList from './ProjectList';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Route exact path='/' component={Landing} />
          <Route path='/user' component={UserList}/>
          <Route path='/projects' component={ProjectList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
