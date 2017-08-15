import React from 'react';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import ActionEject from 'material-ui/svg-icons/action/eject';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

function AppDrawer(props) {
  return (
    <Drawer open={ props.open } docked={ false } onRequestChange={ props.changeOpenState }>
      <AppBar title="Menu" showMenuIconButton={ false }/>
      <FlatButton label="Sign Out" secondary={ true } fullWidth={ true } icon={ <ActionEject/> }/>
      <BottomNavigation>
        <BottomNavigationItem label="Sign Out" icon={ <ActionEject/> }/>
        <BottomNavigationItem label="My Account" icon={ <ActionAccountCircle/> }/>
      </BottomNavigation>
    </Drawer>
  )
}

export default AppDrawer;
