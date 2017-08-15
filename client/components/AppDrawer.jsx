import React from 'react';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

function AppDrawer(props) {
  return (
    <Drawer open={ props.open } docked={ false } onRequestChange={ props.changeOpenState }>
      <AppBar title="Menu" showMenuIconButton={ false }/>
    </Drawer>
  )
}

export default AppDrawer;
