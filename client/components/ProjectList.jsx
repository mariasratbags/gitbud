import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProjectList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };

    this.getProjects();
  }

  getProjects() {
    axios.get('/API/projects/')
    .then(project => {
      this.setState({projects: project.data});
    })
    .catch(console.error);
  }

  render() {
    return (
      <div>
        <h1>This is the Project List Page</h1>
        <ul>
          {this.state.projects.map(project => <li><Link to={`projects/${project.projectId}`}>{project.project}</Link></li>
          )}
        </ul>
      </div>
    );
  }
}

export default ProjectList;
