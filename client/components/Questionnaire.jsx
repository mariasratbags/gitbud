import React from 'react';
import { Card } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguages: [],
      selectedSkillLevel: null,
      description: '',
    };
  }

  handleCheck(e, b) {
    e = e.target.value;
    if (b) {
      this.setState({ selectedLanguages: this.state.selectedLanguages.concat([e]) }, () => console.log(this.state.selectedLanguages));
    } else {
      let index = this.state.selectedLanguages.indexOf(e);
      let copy = this.state.selectedLanguages.slice(0);
      copy.splice(index, 1);
      this.setState({ selectedLanguages: copy }, () => console.log(this.state.selectedLanguages));
    }
  }

  onSkillLevelSelect(e) {
    e = e.target.value;
    this.setState({ selectedSkillLevel: e }, () => console.log(this.state.selectedSkillLevel));
  }

  onDescriptionChange(e) {
    e = e.target.value;
    this.setState({ description: e }, () => console.log(this.state.description));
  }

  render() {
    return (
      <Card style={ { width: '50%', margin: 'auto', padding: 12, marginTop: 12 } }>
        <h1>Welcome, FIRST_NAME.</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius quam id quam aliquot, quis varius est euismod.</p>
        <br />
        <p>Check all languages you are interested or, b have experience in:</p>
        <Checkbox label="JavaScript" value="JavaScript" onCheck={(e, b) => this.handleCheck(e, b)} />
        <Checkbox label="Ruby" value="Ruby" onCheck={(e, b) => this.handleCheck(e, b)} />
        <Checkbox label="Python" value="Python" onCheck={(e, b) => this.handleCheck(e, b)} />
        <Checkbox label="PHP" value="PHP" onCheck={(e, b) => this.handleCheck(e, b)} />
        <Checkbox label="Perl" value="Perl" onCheck={(e, b) => this.handleCheck(e, b)} />
        <Checkbox label="Java" value="Java" onCheck={(e, b) => this.handleCheck(e, b)} />
        <Checkbox label="C++" value="C++" onCheck={(e, b) => this.handleCheck(e, b)} />
        <Checkbox label="C#" value="C#" onCheck={(e, b) => this.handleCheck(e, b)} />
        <Checkbox label="Objective-C" value="Objective-C" onCheck={(e, b) => this.handleCheck(e, b)} />
        <br />

        <p>Select your proficieny level at the chosen languages above:</p>
        <RadioButtonGroup value={this.state.selectedSkillLevel} onChange={(e) => this.onSkillLevelSelect(e)}>
          <RadioButton label="Beginner" value ="Beginner" />
          <RadioButton label="Intermediate" value="Intermediate" />
          <RadioButton label="Advanced" value="Advanced" />
        </RadioButtonGroup>
        <br />
        <p>Write a short introduction about yourself that other GitBud members can see:</p>
        <TextField multiLine={ true } rows={ 2 } style ={ { width: '100%' } } onChange={(e) => this.onDescriptionChange(e)} />
        <br />
        <RaisedButton label="Submit" secondary={ true }  fullWidth={ true } />
      </Card>
    );
  }
}

export default Questionnaire;
