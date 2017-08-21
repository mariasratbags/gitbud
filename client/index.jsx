  /*
    This is the entry point where we inject the App component into an element on index.html

    In order for child components to get access to the Redux store, Provider allows them to be subscribed to it. Provider magically makes the store available to all components in the application without passing it explicitly. This is only used once when you render the root component (App).
    LINK: http://redux.js.org/docs/basics/UsageWithReact.html

    In order to use Material-UI React Components, we must use MuiThemeProvider
    LINK: http://www.material-ui.com/#/get-started/usage
  */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
