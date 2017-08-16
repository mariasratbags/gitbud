import React from 'react';
import { connect } from 'react-redux';

import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFace from 'material-ui/svg-icons/action/face';
import ContentSend from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';

class UserDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    // this.props.user = this.props.users[this.props.users.indexOf(this.props.id)];
    this.expandCard = () => this.setState({ expanded: true });
  }

  render() {
    console.log(this.props.users);
    return (
      <Card style={ {width: '40%', margin: 'auto', marginTop: 12, padding: 12 } }>
        <Card expanded={ this.state.expanded }>
          <CardMedia overlay={ <CardTitle title={ this.props.user.name } subtitle='Experience: n00b'/> }>
             <img src={ this.props.user.avatarUrl } />
          </CardMedia>
          <div style={ { width: '35%', float: 'right', padding: 15 } }>
            <RaisedButton label='Message Me' style={ { width: '60%' } } fullWidth={ true } icon={ <ActionFace /> } onClick={ this.expandCard } primary={ true }/>
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

export default connect(mapStateToProps)(UserDetails);
