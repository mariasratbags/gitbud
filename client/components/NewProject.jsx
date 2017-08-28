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
    this.state = {
      open: true,
      project: '',
    };
    this.handleClose = this._handleClose.bind(this);
  }

  _handleClose() {
    this.setState({ open: false });
    window.location.href = '/projects'
  }

  addProject(e) {
    e.preventDefault();
    this.handleClose();

    let data = {
      project: this.state.project,
      language: this.state.language,
      experience: this.state.experience,
      description: this.state.description,
      link: this.state.link
    }

    axios.post('/API/newproject', data)
    .catch(console.error);
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
        <form onSubmit={this.addProject.bind(this)}>

          <TextField
            name="project"
            hintText="Project Name"
            value={this.state.project}
            onChange={(e, newValue) => this.setState({ project: newValue})}
          />
          <TextField
            name="language"
            hintText="Project Language"
            value={this.state.language}
            onChange={(e, newValue) => this.setState({ language: newValue})}
          />
          <TextField
            name="description"
            hintText="Project Description"
            value={this.state.description}
            onChange={(e, newValue) => this.setState({ description: newValue})}
          />
          <TextField name="experience" hintText="Experience Level"
            value={this.state.experience}
            onChange={(e, newValue) => this.setState({ experience: newValue})}
          />
          <TextField name="link" hintText="Link to the Github repo"
            value={this.state.link}
            onChange={(e, newValue) => this.setState({ link: newValue})}
          />
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
