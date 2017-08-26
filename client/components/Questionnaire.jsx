import React from 'react';
import axios from 'axios';
import { Card } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'JavaScript',
      selectedSkillLevel: 'Beginner',
      description: '',
    };
  }

  onLanguageSelect(val) {
    this.setState({ selectedLanguage: val }, () => console.log(this.state.selectedLanguage));
  }

  onSkillLevelSelect(val) {
    this.setState({ selectedSkillLevel: val }, () => console.log(this.state.selectedSkillLevel));
  }

  onDescriptionChange(val) {
    this.setState({ description: val }, () => this.state.description);
  }

  onButtonClick() {
    let userInfo = {
      language: this.state.selectedLanguage,
      experience: this.state.selectedSkillLevel,
      description: this.state.description,
    };

    axios.post('/API/users', userInfo)
      .then((response) => {
        console.log(response);
        // redirect to home after successful submission
        window.location.href = '/projects';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Card style={ { width: '50%', margin: 'auto', padding: 12, marginTop: 12 } }>
        <h1>Welcome, {this.props.user.name}</h1>
        <br />
        <p>Select your preferred language to use with other GitBud members:</p>
        <DropDownMenu value={this.state.selectedLanguage} onChange={(e, idx, val) => this.onLanguageSelect(val)}>
          <MenuItem value={"JavaScript"} primaryText="JavaScript" />
          <MenuItem value={"C"} primaryText="C" />
          <MenuItem value={"C++"} primaryText="C++" />
          <MenuItem value={"Ruby"} primaryText="Ruby" />
          <MenuItem value={"Python"} primaryText="Python" />
          <MenuItem value={"PHP"} primaryText="PHP" />
        </DropDownMenu>
        <br />
        <p>Select your proficieny level at the chosen language above:</p>
        <RadioButtonGroup name="skillLevel" defaultSelected={this.state.selectedSkillLevel} onChange={(e, val) => this.onSkillLevelSelect(val)}>
          <RadioButton label="Beginner" value ="Beginner" />
          <RadioButton label="Intermediate" value="Intermediate" />
          <RadioButton label="Advanced" value="Advanced" />
        </RadioButtonGroup>
        <br />
        <p>Write a short introduction about yourself that other GitBud members can see:</p>
        <TextField id="description" multiLine={ true } rows={ 2 } style ={ { width: '100%' } } onChange={(e, val) => this.onDescriptionChange(val)} />
        <br />
        <RaisedButton label="Submit" secondary={ true }  fullWidth={ true } onClick={() => this.onButtonClick()} />
      </Card>
    );
  }
}

export default Questionnaire;
