import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar';
import {Card, CardText } from 'material-ui/Card';
import {
  Dialog,
  TextField,
  FlatButton,
  MuiThemeProvider,
  getMuiTheme,
} from 'material-ui';

class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleClose = this._handleClose.bind(this);
  }

  _handleClose() {
    this.setState({ open: false });
    window.location.href = '/projects'
  }

  addProject(e) {
    e.preventDefault();
    alert('Submitted form!');
    this.handleClose();
    // axios.post('/API/newproject', {
    //   project: ,
    //   language: ,
    //   description: ,
    //   experience: ,
    //   link:
    // })
    // .catch(console.error);
  }

  render() {
    const actions = [
      <FlatButton
        type="reset"
        label="Reset"
        secondary={true}
        style={{ float: 'left' }}
        />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        type="submit"
        label="Submit"
        primary={true}
        />,
    ];

    return (
      <Dialog
        title="Create a new project!"
        modal={true}
        open={this.state.open}
      >
        <form
          onSubmit={this.addProject.bind(this)}>

          <TextField name="project" hintText="Project Name" />
          <TextField name="language" hintText="Project Language" />
          <TextField name="description" hintText="Project Description" />
          <TextField name="experience" hintText="Experience Level" />
          <TextField name="link" hintText="Link to the Github repo" />
          <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
            {actions}
          </div>
        </form>
      </Dialog>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
