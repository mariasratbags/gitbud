import React from 'react';
import Paper from 'material-ui/Paper';
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
        <CardHeader
          title="Project Name"
        />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </CardText>
        <div style={style}>
          <Checkbox
            label="Fork repo & Clone repo"
          />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </CardText>
          <Checkbox
            label="Install packages"
          />
          <CardText>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </CardText>
          <Checkbox
            label="Fix The Issue"
          />
          <CardText>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </CardText>
          <Checkbox
            label="Create a Pull Request"
          />
          <CardText>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </CardText>
        </div>
        <RaisedButton label="Complete" primary={true} style={style} />
      </Card>
    </Paper>
  );
}

export default ProjectStatus;
