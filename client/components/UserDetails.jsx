import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { fullWhite } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentSend from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';

class UserDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.paired = false;
    this.expandCard = () => this.setState({ expanded: true });
    this.togglePair = this.togglePair.bind(this);
    this.pairButton = () => {
      if (this.props.user.paired) {
        return <RaisedButton label='Partnered' style={ { margin: 2 } } labelColor={ fullWhite } backgroundColor='#a4c639' fullWidth={ true } icon={ <ActionDone color={ fullWhite } /> } onClick={ this.togglePair } />
      } else if (this.props.match.params.projectId) {
        return <RaisedButton label='Work With Me' style={ { margin: 2 } } fullWidth={ true } icon={ <ActionBuild /> } onClick={ this.togglePair } primary={ true } />
      }
    };
  }

  togglePair() {
    axios.post('/API/projects', {
      partnered: this.props.user.id,
      project: this.props.projectId,
    })
      .then((response) => {
        this.props.dispatchPairing(this.props.user.id, Number(this.props.match.params.projectId));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Card style={ {width: '40%', margin: 'auto', marginTop: 12, padding: 12 } }>
        <Card expanded={ this.state.expanded }>
          <CardMedia overlay={ <CardTitle title={ this.props.user.name } subtitle='Experience: n00b'/> }>
            <img src={ this.props.user.avatarUrl } />
          </CardMedia>
          <div style={ { width: '35%', float: 'right', padding: 15 } }>
            { this.pairButton() }
            <RaisedButton label='Message Me' style={ { margin: 2 } } fullWidth={ true } icon={ <ActionFace /> } onClick={ this.expandCard } secondary={ true }/>
          </div>
          <div style={ { width: '60%' } }>
            <CardTitle title='Languages' subtitle='JavaScript, React, Spanish'/>
          </div>
          <CardTitle title='Projects' subtitle='N Queens, Hello World'/>
          <div style={ { width: '35%', float: 'right', padding: 15 } } expandable={ true }>
            <RaisedButton label='Send' style={ { width: '60%' } } fullWidth={ true } icon={ <ContentSend /> } secondary={ true }/>
          </div>
          <div style={ { width: '60%' } } expandable={ true }>
            <TextField multiLine={ true }
              floatingLabelText="Invite Username to code with you" hintText="Enter your message"
              rows={ 2 } style={ { padding: 20 } }/>
          </div>
        </Card>
      </Card>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userId = Number(props.match.params.id);
  return {
    user: state.users.filter(user => user.id === userId)[0]
  };
};

const mapDispatchToProps = dispatch =>
  ({
    dispatchPairing: (userId, projectId) => dispatch({ type: 'CHANGE_USER_PAIRING', userId, projectId })
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
