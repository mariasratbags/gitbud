import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

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
    this.getUsers();
  }

  getUsers() {
    axios.get('/API/recommended-pairs')
      .then(users => {
        this.props.addUsers(users.data);
      })
      .catch(console.error);
    }

  render() {
    return (
      <BrowserRouter>
        <Paper>
          <AppBar title="GitBud" />
          <Nav />
          <p>{ this.props.message }</p>
          <button onClick={ this.props.changeString }>Click</button>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/signup" component={Questionnaire} />
            <Route exact path="/projects" component={ProjectList} />
            <Route path="/projects/:id" component={ProjectDetails} />
            <Route path="/user/:id" component={UserDetails} />
            <Route component={NotFound} />
          </Switch>
        </Paper>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeString: () => dispatch({
      type: 'CHANGE_STRING',
      text: 'some other message'
    }),
    addUsers: (users) => dispatch({
      type: 'USERS_ADD',
      users
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
