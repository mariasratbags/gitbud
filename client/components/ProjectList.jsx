import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';

function ProjectList() {
  return (
    <div>
      <p>This is ProjectList component</p>
      <Switch>
        <Route path="/project/:id" component={ProjectDetails} />
      </Switch>
    </div>
  );
}

export default ProjectList;
