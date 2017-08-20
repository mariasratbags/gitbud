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

const style = {
  margin: 12,
};

const ProjectStatus = (props) => {
  return (
    <Paper>
      <Card>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Project Name" />
          </ToolbarGroup>
          <ToolbarGroup lastChild={ true }>
            {console.log(this.props.project)}
            <RaisedButton secondary={ true } label="See on GitHub" href={this.props.project.link} target="_blank"/>
          </ToolbarGroup>
        </Toolbar>
        <CardHeader
          title={props.project.project}
        />
        <CardText>
          {props.project.description || 'This project has no description. Here\'s some Latin: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }
        </CardText>
         <div style={style}>
          {
            props.progress.map((item, index) => 
              (
                <ProgressItem
                  dispatchProgress={props.dispatchProgress}
                  complete={item.complete}
                  text={item.text}
                  key={index}
                  index={index}
                  hint={item.hint}
                  projectId={props.project.id}
                />
              )
            )
          }
        </div> 
        <RaisedButton label="Submit Progress" onClick={props.submitProgress} primary={true} style={style} />
      </Card>
    </Paper>
  );
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
