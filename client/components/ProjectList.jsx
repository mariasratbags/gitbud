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

const ProjectList = (props) => {
  return (
    <Paper>
      <Table>
        <TableHeader displaySelectAll={ false }>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Language</TableHeaderColumn>
            <TableHeaderColumn>Experience</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows={ true }>
          {props.projects.map(project =>
            <TableRow key={ project.id }>
              <TableRowColumn><Link to={`/projects/${ project.id }`}>{ project.project }</Link></TableRowColumn>
              <TableRowColumn>{project.language}</TableRowColumn>
              <TableRowColumn>{project.experience}</TableRowColumn>
            </TableRow>)}
        </TableBody>
      </Table>
      <RaisedButton label="I'm interested" primary={ true } fullWidth={ true } />
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
