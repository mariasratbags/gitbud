import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionDone from 'material-ui/svg-icons/action/done';
import { fullWhite } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const UserList = (props) => {

  let togglePair = function() {
    axios.post('/API/pair', {
      partnered: this.props.user.id,
      project: this.props.match.params.projectId,
    })
      .then((response) => {
        this.props.dispatchPairing(this.props.user.id, Number(this.props.match.params.projectId));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let pairButton = function(user, index) {
    console.log('line 34', user);
    //console.log('line 61', this.props.user.paired);
    //
    if (user.paired.length > 0) {
      return <RaisedButton
        style={ {marginLeft: 'auto', width: 200, height: 40} }
        key={ index }
        label='Partnered'
        labelColor={ fullWhite }
        backgroundColor='#a4c639'
        fullWidth={ false }
        icon={ <ActionDone
          color={ fullWhite } /> }
        onClick={ togglePair } />
    } else {
      return <RaisedButton
        style={ {marginLeft: 'auto', width: 200, height: 40} }
        label='Work With Me'
        icon={ <ActionBuild /> }
        onClick={ togglePair }
        primary={ true } />
    }
  }

  return (
    <List>
      <Subheader>Users interested in this project</Subheader>
      { props.users.map((user, index) => {
        return (
          <div>
            <ListItem
              containerElement={ <Link to={ `/user/${ user.id }${ props.projectId ? '/' + props.projectId : null }` }/> }
              leftAvatar={
                <Avatar src={ user.avatarUrl } />
              }
              key={ index }
              primaryText={ user.name }
              secondaryText={ "Rating: " + user.rating }
            />
          <div>{ pairButton(user, index) }</div>
          </div>
        );
      },
      )}
    </List>
  );
};

export default UserList;
