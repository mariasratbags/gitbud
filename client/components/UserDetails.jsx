import React from 'react';

import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFace from 'material-ui/svg-icons/action/face';

function UserDetails() {
  return (
    <Card style={ {width: '40%', margin: 'auto', marginTop: 12, padding: 12 } }>
      <Card>
        <CardMedia overlay={ <CardTitle title='Username' subtitle='Experience: n00b'/> }>
          <img src='https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAyLAAAAJDQ4YzMwZTNlLTAwODItNGYwMC1iMGQxLWYzOGZiZjM5YWE3NQ.jpg'/>
        </CardMedia>
        <div style={ { width: '35%', float: 'right', padding: 15 } }>
          <RaisedButton label='Message Me' style={ { width: '60%' } } fullWidth={ true } icon={ <ActionFace/> } primary={ true }/>
        </div>
        <div style={ { width: '60%' } }>
          <CardTitle title='Languages' subtitle='JavaScript, React, Spanish'/>
        </div>
        <CardTitle title='Projects' subtitle='N Queens, Hello World'/>
      </Card>
    </Card>
  );
}

export default UserDetails;
