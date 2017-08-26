import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ProjectDetails from './ProjectDetails';
import ProjectStatus from './ProjectStatus';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.POSTprogress = this.POSTprogress.bind(this);
    if (this.props.project.paired.length > 0 && this.props.progress.length < 1) {
      this.GETprogress();
    }
  }

  POSTprogress() {
    axios.post('/API/progress', {
      projectId: this.props.project.id,
      progress: this.props.progress,
    })
    .catch(console.error);
  }

  GETprogress() {
    axios.get('/API/progress')
      .then(res =>
        this.props.loadProgress(res.data)
      )
      .catch(console.error);
  }

  render() {
      // if (this.props.project.paired.length > 0) {
      //   return <ProjectStatus project={this.props.project} progress={this.props.progress} dispatchProgress={this.props.dispatchProgress} submitProgress={this.POSTprogress} />
      // } else {
         return <ProjectDetails routedProjectId={this.props.match.params.id} />
      // }
  }
}

const mapStateToProps = (state, props) => {
  const projectId = Number(props.match.params.id);
  const project = state.projects.filter(project => project.id === projectId)[0];
  return {
    project,
    progress: state.projectProgress[projectId] || [],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatchProgress: (projectId, itemIndex) => dispatch({
      type: 'PROGRESS_CHANGE_ITEM',
      projectId,
      itemIndex
    }),
    loadProgress: progress => dispatch({
      type: 'PROGRESS_LOAD_ITEMS',
      progress,
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
