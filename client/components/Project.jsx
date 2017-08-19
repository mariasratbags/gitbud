import React from 'react';
import { connect } from 'react-redux';

import ProjectDetails from './ProjectDetails';
import ProjectStatus from './ProjectStatus';

class Project extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      if (this.props.project.paired.length > 0) {
        return <ProjectStatus />
      } else {
        return <ProjectDetails routedProjectId={this.props.match.params.id} />
      }
  }
}

const mapStateToProps = (state, props) => {
  const projectId = Number(props.match.params.id);
  return {
    project: state.projects.filter(project => project.id === projectId)[0],
  };
};

export default connect(mapStateToProps)(Project);
