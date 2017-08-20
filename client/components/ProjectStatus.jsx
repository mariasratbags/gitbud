import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const style = {
  margin: 12,
};

class ProjectStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit() {
    this.setState({
      open: true
    });
    console.log(this.props);
    this.props.submitProgress()
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <Paper style={ {width: '95%', margin: 'auto', marginTop: 12, padding: 12 } }>
        <Card style={ { marginBottom: 12 } }>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Project Name" />
            </ToolbarGroup>
            <ToolbarGroup lastChild={ true }>
              <RaisedButton secondary={ true } label="See on GitHub" href={this.props.project.link} target="_blank"/>
            </ToolbarGroup>
          </Toolbar>
          <CardHeader
            title={this.props.project.project}
          />
          <CardText>
            {this.props.project.description || 'This project has no description. Here\'s some Latin: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }
          </CardText>
           <div style={style}>
            {
              this.props.progress.map((item, index) =>
                (
                  <ProgressItem
                    dispatchProgress={this.props.dispatchProgress}
                    complete={item.complete}
                    text={item.text}
                    key={index}
                    index={index}
                    hint={item.hint}
                    projectId={this.props.project.id}
                  />
                )
              )
            }
          </div>
          <RaisedButton label="Submit Progress" onClick={this.handleSubmit} primary={true} style={style} />
          {/* <RaisedButton label="Alert" onClick={this.handleSubmit} /> */}
          <Dialog
            actions={
              <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose}
              />
            }
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
              Congratulations! You've completed this project!
          </Dialog>
        </Card>
      </Paper>
    )
  }
}

export default ProjectStatus;

const ProgressItem = (props) => {
  const check = () => props.dispatchProgress(props.projectId, props.index);
  return (
    <div>
      <Checkbox checked={props.complete} label={props.text} onCheck={check} />
      <CardText>
        {props.hint || 'This prompt has no hint. Would you like some more Latin?'}
      </CardText>
    </div>
  )
};
