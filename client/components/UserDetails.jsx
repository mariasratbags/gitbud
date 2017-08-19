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
      expanded: false
    }
    this.paired = false;
    this.expandCard = () => this.setState({ expanded: true });
    this.togglePair = this.togglePair.bind(this);
    this.pairButton = this.pairButton.bind(this);
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
    const isPaired = this.props.user.paired;
    if (isPaired) {
      return <RaisedButton
        label='Partnered'
        labelColor={ fullWhite }
        backgroundColor='#a4c639'
        fullWidth={true}
        icon={ <ActionDone
          color={ fullWhite } /> }
          onClick={ this.togglePair } />
    } else if (this.props.match.params.projectId) {
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
        <Card expanded={ this.state.expanded } style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 12 }}>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="User Profile" />
            </ToolbarGroup>
          </Toolbar>
          <CardTitle title={ this.props.user.name } subtitle="Experience: Beginner" />
          <div>
            <CardTitle title="Languages" subtitle='JavaScript, React, Spanish'/>
          </div>
          <CardTitle title="Projects" subtitle='N Queens, Hello World'/>
          <div>
            { this.pairButton() }
            <RaisedButton label='Message Me' fullWidth={true} icon={<ActionFace />} onClick={this.expandCard} secondary={true} />
          </div>
          <div expandable={true}>
            <TextField
              floatingLabelText="Ask user to pair up"
              hintText="Enter your message"
              style={{ padding: 20 }}
            />
          </div>
          <div expandable={true}>
            <RaisedButton label="Send" fullWidth={true} icon={<ContentSend />} secondary={true}/>
          </div>
        </Card>
      </Paper>
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



{/* <CardMedia overlay={ <CardTitle title={ this.props.user.name } subtitle='Experience: n00b'/> }>
  <img src={ this.props.user.avatarUrl } />
</CardMedia> */}
