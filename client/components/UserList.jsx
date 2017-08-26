import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';


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

  let togglePair = function(user) {

    axios.post('/API/pair', {
      partnered: user.id,
      project: props.projectId
    })
      .then((response) => {
        props.dispatchPairing(user.id, Number(props.projectId));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let pairButton = function(user, index) {
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
        onClick={ togglePair(user) } />
    } else {
      return <RaisedButton
        style={ {marginLeft: 'auto', width: 200, height: 40} }
        key={ index }
        label='Work With Me'
        icon={ <ActionBuild /> }
        onClick={ togglePair(user) }
        primary={ true } />
    }
  }


  return (
    <List>
      <Subheader>Users working on this project</Subheader>
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchPairing: (userId, projectId) => dispatch({ type: 'CHANGE_USER_PAIRING', userId, projectId })
  };
}

export default connect(null, mapDispatchToProps)(UserList);
// export default UserList;
