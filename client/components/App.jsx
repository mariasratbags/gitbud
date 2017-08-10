import React from 'react';


import Landing from './Landing';
import User from './User';

class App extends React.Component {
  render() {
    return (

        <div>
          <a href="/user">See users</a>
        </div>

    )
  }
}

export default App;

// <Route path="/" component={Landing} />
//           <Route path="/user" component={User} />