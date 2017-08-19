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
        return <ProjectStatus project={this.props.project} progress={this.props.progress} dispatchProgress={this.props.dispatchProgress} />
      } else {
        return <ProjectDetails routedProjectId={this.props.match.params.id} />
      }
  }
}

const mapStateToProps = (state, props) => {
  const projectId = Number(props.match.params.id);
  const project = state.projects.filter(project => project.id === projectId)[0];
  return {
    project,
    progress: state.projectProgress[projectId],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatchProgress: (projectId, itemIndex) => dispatch({ type: 'PROGRESS_CHANGE_ITEM', projectId, itemIndex }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
