import React from 'react';

function ProjectStatus(props) {
  return (
    <div>
      <pre><code>{JSON.stringify(props.match.params)}</code></pre>
      <p>This is ProjectStatus component</p>
    </div>
  );
}

export default ProjectStatus;
