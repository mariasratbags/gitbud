import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import Landing from './Landing';
import UserDetails from './UserDetails';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';
import Questionnaire from './Questionnaire';
import NotFound from './NotFound';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/user" component={UserDetails} />

            <Route exact path="/projects" component={ProjectList} />
            <Route path="/signup" component={Questionnaire} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
