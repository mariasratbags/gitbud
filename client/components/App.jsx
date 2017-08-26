/*
  This is the main (parent) component for the application.

  Inside the App state component we are 3 ajax calls to the server
    1. getting the list of projects from the database
    2. getting the message from the database
    3. checking authentication

  You can find these routes inside server/routes/index.js

 */

import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { fullWhite } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import ActionEject from 'material-ui/svg-icons/action/eject';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';


import AppDrawer from './AppDrawer';
import Landing from './Landing';
import UserProfile from './UserProfile';
import UserDetails from './UserDetails';
import Project from './Project';
import ProjectStatus from './ProjectStatus';
import ProjectList from './ProjectList';
import Questionnaire from './Questionnaire';
import NotFound from './NotFound';
import MyProjects from './MyProjects';
import NewProject from './NewProject'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }

    this.checkAuthenticated();

  }

  //gets list of projects
  getProjects() {
    axios.get('/API/projects/')
      .then((project) => {
        this.props.addProjectsList(project.data);
      })
      .catch(console.error);
  }

  //gets messages
  getMessages() {
    axios.get('/API/messages')
      .then((res) => {
        this.props.loadMessages(res.data)
      })
      .catch(console.error);
  }

  //gets authentication
  checkAuthenticated() {
    axios.get('/auth/authenticated')
      .then((res) => {
        this.setState({ loggedIn: res.data });
        this.getMessages();
        this.getProjects();
      });
  }

  render() {
    /*
     Condition:
     If user is registered and logs render all the components.
     If user is new and logged in using github auth, render questionnaire
     If user is not logged in (logged out) display landing page
    */
    if (this.state.loggedIn.language) {
      return (
        <BrowserRouter>
          <div>
            <AppBar
              iconElementLeft={<Link to='/my-projects'><RaisedButton label="My Projects" fullWidth={ true }/></Link>}
              title={<Link to='/'style={{ textDecoration: 'none', color:'white'}}><span>GITBUD</span></Link>}
              titleStyle={{cursor: 'pointer', textAlign:'center'}}
              iconElementRight={<IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                >
                <MenuItem primaryText="Notifications" />
                <Link to='/user' style={{ textDecoration: 'none'}}><MenuItem primaryText="Profile" rightIcon={ <ActionAccountCircle/>}/> </Link>
                <a href="/auth/signout" style={{ textDecoration: 'none'}} ><MenuItem primaryText="Sign out" rightIcon={ <ActionEject/>} /></a>
              </IconMenu>}
            />


            {/* opens and closes side menu */}
            {/* <AppDrawer open={ this.state.drawerOpen } changeOpenState={ open => this.setState({ drawerOpen: open }) } closeDrawer={ () => this.setState({ drawerOpen: false}) }/> */}

            {/*
              Switch renders a route exclusively. Without it, it would route inclusively
              LINK: https://reacttraining.com/react-router/web/api/Switch
            */}
            <Switch>
              <Route exact path="/" component={ProjectList} />
              <Route path="/signup" component={Questionnaire} />
              <Route exact path="/projects" component={ProjectList} />
              <Route path="/projects/:id" component={Project} />
              <Route path="/status" component={ProjectStatus} />
              <Route path="/my-projects" component={MyProjects} />
              <Route path="/newproject" component={NewProject} />

              {/*
                given this path render this component and pass down the loggedIn state as user props
              */}
              <Route exact path='/user'
                render={() => (<UserProfile user={this.state.loggedIn} />) } />

              <Route path="/user/:id/:projectId?" component={UserDetails} />
              <Route component={NotFound} />
            </Switch>

          </div>
        </BrowserRouter>
      );
    } else if (this.state.loggedIn) {
      return <Questionnaire user={this.state.loggedIn} />;
    } else {
          return <Landing checkAuth={ this.checkAuthenticated } />;
    }
  }
}

/*
  Map our state to this component as props
  State can be found in store/reducers.js
*/
const mapStateToProps = (state) => {
  return {
    message: state.message,
    projects: state.projects,
  };
};

/*
  Map our dispatch to this component as props
  Dispatch can be found in
*/
const mapDispatchToProps = (dispatch) => {
  return {
    changeString: () => dispatch({
      type: 'CHANGE_STRING',
      text: 'some other message'
    }),
    addProjectsList: projects => dispatch({
      type: 'LIST_PROJECTS',
      projects,
    }),
    loadMessages: messages => dispatch({
      type: 'MESSAGES_LOAD',
      messages,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
