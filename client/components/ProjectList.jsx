import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import axios from 'axios';

class ProjectList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };

    this.getData();
  }

  getData() {
    axios.get('/API/projects/').then(data => this.setState({projects: data.data}));
  }

  render() {
    return (
      <div>
        <ul>
          <li>Hello world</li>
          {this.state.projects.map((data) => <li><Link to={`project/${data.projectId}`}>{data.project}</Link></li>)}
        </ul>
      </div>
    );
  }
}


function ProjectList() {
  return (
    <div>
      <p>id: 1This is ProjectList component</p>
      <p>id: 2This is ProjectList component</p>
      <p>id: 3This is ProjectList component</p>
      <p>id: 4This is ProjectList component</p>
      <p>id: 5This is ProjectList component</p>
      <Switch>
        <Route path="/project/:id" component={ProjectDetails} />
      </Switch>
    </div>
  );
}

export default ProjectList;
