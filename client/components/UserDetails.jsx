import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
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
      expanded: false,
      message: '',
    }
    this.paired = false;
    this.expandCard = () => {
      this.setState({ expanded: true });
    }
    this.togglePair = this.togglePair.bind(this);
    this.pairButton = this.pairButton.bind(this);
    this.setMessageText = (_, text) => this.setState({ message: text });
    this.sendMessage = () => {
      axios.post('/API/messages', {
        text: this.state.message,
        recipient: this.props.user.id,
      })
        .then(() => {
          this.props.dispatchMessage(this.props.user.id, {
            text: this.state.message,
            sender: true,
          });
        });
    };
  }

  togglePair() {
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

  pairButton() {
    console.log('line 60', this.props.user);
    console.log('line 61', this.props.user.paired);

    if (this.props.user.paired.length > 0) {
      return <RaisedButton
        label='Partnered'
        labelColor={ fullWhite }
        backgroundColor='#a4c639'
        fullWidth={true}
        icon={ <ActionDone
          color={ fullWhite } /> }
        onClick={ this.togglePair } />
    } else if (this.props.match.params.projectId) {
      console.log('line 73', this.props.match);
      return <RaisedButton
        label='Work With Me'
        fullWidth={true}
        icon={ <ActionBuild /> }
        onClick={ this.togglePair }
        primary={ true } />
    }
  }

  render() {
    return (
      <Paper style={{ width: '95%', margin: 'auto', marginTop: 12, padding: 12 }}>
        <Card expanded={this.state.expanded} style={{ width: '40%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 12 }}>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="User Profile" />
            </ToolbarGroup>
          </Toolbar>
          <CardMedia>
            <div className="img-container">
              <img className="img-circle" src={this.props.user.avatarUrl} alt="" />
            </div>
          </CardMedia>
          <CardTitle title={ this.props.user.name } subtitle={'Experience: ' + this.props.user.experience} />
          <CardTitle title="Description" subtitle={this.props.user.description} />
          <CardTitle title="Language" subtitle={this.props.user.language}/>
          <CardTitle title="Projects" subtitle={this.props.projects.map(project => project.project).join(' ')}/>
          <div>
            { this.pairButton() }
            <RaisedButton label='Message Me' fullWidth={true} icon={<ActionFace />} onClick={this.expandCard} secondary={true} />
          </div>
          <div expandable={true}>
            <TextField
              floatingLabelText="Ask user to pair up"
              hintText="Enter your message"
              style={{ padding: 20 }}
              onChange={ this.setMessageText }
            />
          </div>
          <div expandable={true}>
            <RaisedButton label="Send" onClick={ this.sendMessage } fullWidth={true} icon={<ContentSend />} secondary={true}/>
            { this.props.messages.map((message, index) =>
              <Card key={ index }>
                <CardTitle>{ message.sender ? 'You' : this.props.user.name }</CardTitle>
                <CardText>{ message.text }</CardText>
              </Card>
            )}
          </div>
        </Card>
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userId = Number(props.match.params.id);
  const user = state.users.filter(user => user.id === userId)[0];
  const projects = state.projects.filter(project => user.projects.indexOf(project.id) > -1)
  return {
    user,
    projects,
    messages: state.messages[userId] || [],
  };
};

const mapDispatchToProps = dispatch =>
  ({
    dispatchPairing: (userId, projectId) => dispatch({ type: 'CHANGE_USER_PAIRING', userId, projectId }),
    dispatchMessage: (userId, message) => dispatch({ type: 'MESSAGE_SEND', userId, message }),
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);



/* <CardMedia overlay={ <CardTitle title={ this.props.user.name } subtitle='Experience: n00b'/> }>
  <img src={ this.props.user.avatarUrl } />
</CardMedia> */
