import React from 'react';
import { Card } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function Questionnaire() {
  return (
    <Card style={ { width: '50%', margin: 'auto', padding: 12, marginTop: 12 } }>
      <h1>Welcome, FIRST_NAME.</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius quam id quam aliquot, quis varius est euismod.</p>
      <br />
      <p>Select your preferred langauge to use with other GitBud members:</p>
      <DropDownMenu value={'JavaScript'}>
        <MenuItem value={'JavaScript'} primaryText="JavaScript" />
        <MenuItem value={'Ruby'} primaryText="Ruby" />
        <MenuItem value={'Python'} primaryText="Python" />
        <MenuItem value={'PHP'} primaryText="PHP" />
      </DropDownMenu>
      <br />
      <p>Select your proficieny level at the chosen language above:</p>
      <RadioButtonGroup>
        <RadioButton value="Beginner" label="Beginner" />
        <RadioButton value="Intermediate" label="Intermediate" />
        <RadioButton value="Advanced" label="Advanced" />
      </RadioButtonGroup>
      <br />
      <p>Check all languages you are interested or have experience in:</p>
      <Checkbox label="JavaScript" />
      <Checkbox label="Ruby" />
      <Checkbox label="Python" />
      <Checkbox label="PHP" />
      <Checkbox label="Perl" />
      <Checkbox label="Java" />
      <Checkbox label="C" />
      <Checkbox label="C++" />
      <Checkbox label="C#" />
      <Checkbox label="Objective-C" />
      <br />
      <p>Write a short introduction about yourself that other GitBud members can see:</p>
      <TextField multiLine={ true } rows={ 2 } style ={ { width: '100%' } } />
      <br />
      <RaisedButton label="Submit" secondary={ true }  fullWidth={ true } />
    </Card>
  );
}

export default Questionnaire;
