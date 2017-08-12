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
        <p>This is the Project list page</p>
        <ul>
          {this.state.projects.map(project => <li><Link to={`projects/${project.projectId}`}>{project.project}</Link></li>
          )}
        </ul>
      </div>
    );
  }
}

export default ProjectList;
