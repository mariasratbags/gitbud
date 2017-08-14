import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

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
          <p>{this.props.message}</p>
          <Nav />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/signup" component={Questionnaire} />
            <Route exact path="/projects" component={ProjectList} />
            <Route path="/projects/:id" component={ProjectDetails} />
            <Route path="/user/:id" component={UserDetails} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state
  };
};

export default connect(mapStateToProps)(App);
