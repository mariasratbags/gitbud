import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar';
import {Card, CardText } from 'material-ui/Card';
import {
  Dialog,
  TextField,
  FlatButton,
  MuiThemeProvider,
  getMuiTheme,
} from 'material-ui';

const ProjectList = (props) => {
  console.log('ProjectList props: ', props)
  return (
    <Paper style={ {width: '95%', margin: 'auto', marginTop: 12, padding: 12 } }>
      <Card>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Projects"/>
          </ToolbarGroup>
          <ToolbarGroup>

            <Link to='/newproject'><RaisedButton label="Create Project" fullWidth={ true }/></Link>

          </ToolbarGroup>
        </Toolbar>
        <Table style={{ width: '95%', margin: 'auto', marginTop: 12, padding: 12 }}>
          <TableHeader displaySelectAll={ false }>
            <TableRow>
              <TableHeaderColumn>Project Name</TableHeaderColumn>
              <TableHeaderColumn>Language</TableHeaderColumn>
              <TableHeaderColumn>Experience</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={ true } displayRowCheckbox={ false }>
            {props.projects.map(project =>
              (<TableRow key={ project.id }>
                <TableRowColumn><Link to={`/projects/${ project.id }`}>{ project.project }</Link></TableRowColumn>
                <TableRowColumn>{ project.language }</TableRowColumn>
                <TableRowColumn>{ project.experience }</TableRowColumn>
              </TableRow>)
            )}
          </TableBody>
        </Table>
        {/* <RaisedButton label="I'm interested" primary={ true } fullWidth={ true } /> */}
      </Card>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
