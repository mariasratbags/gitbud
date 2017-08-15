import React from 'react';

import { Card, CardMedia } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
// makes the theme available via a higher-0rder component
import muiThemeable from 'material-ui/styles/muiThemeable';

function Landing(props) {
  return (
    <Card style={ { width: '50%', margin: 'auto', paddingBottom: 12, marginTop: 12 } }>
      <AppBar title="Welcome to GitBud!" showMenuIconButton={ false }/>
      <CardMedia>
        <img src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png"/>
      </CardMedia>
      <div style={ { width: '90%', margin: 'auto' } }>
        <RaisedButton label="Sign in with GitHub" secondary={ true }  fullWidth={ true }/>
      </div>
    </Card>
  );
}

export default muiThemeable()(Landing);
