import React from 'react';
import UserList from './UserList';

function ProjectDetails(props) {
  return (
    <div>
      <pre><code>{JSON.stringify(props.match.params)}</code></pre>
      <p>This is ProjectDetails component</p>
      <UserList />
    </div>
  );
}

export default ProjectDetails;
