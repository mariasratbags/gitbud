import React from 'react';

import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';

function UserProfile(props) {
  return (
    <Paper style={{ width: '95%', margin: 'auto', marginTop: 12, padding: 12 }}>
      <Card style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 12 }}>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="User Profile" />
          </ToolbarGroup>
        </Toolbar>
        <CardTitle title={ props.user.name } subtitle="Experience: Beginner" />
        <div>
          <CardTitle title="Languages" subtitle='JavaScript, React, Spanish'/>
        </div>
        <CardTitle title="Projects" subtitle='N Queens, Hello World'/>
      </Card>
    </Paper>
  );
}

export default UserProfile;
