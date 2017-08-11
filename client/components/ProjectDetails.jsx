import React from 'react';

function ProjectDetails(props) {
  return (
    <div>
      <pre><code>{JSON.stringify(props.match.params)}</code></pre>
      <p>This is ProjectDetails component</p>
    </div>
  );
}

export default ProjectDetails;
