import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import SyncIcon from 'material-ui/svg-icons/navigation/refresh';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import Search from './Search.jsx'

/*
    <IconMenu
      iconButtonElement={<IconButton><SettingsIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Un-Annotated: 123" />
      <MenuItem primaryText="Total: 233" />
    </IconMenu>
*/


const RightIconMenu = (props) => (
  <div>
    <Search onTouchTap={props.openDialog} />

    <IconButton><SettingsIcon onTouchTap={props.openDialog} /></IconButton>
    <IconButton><SyncIcon onTouchTap={props.syncLiterature} /></IconButton>

    <Badge
      badgeContent={props.numUnannotated}
      secondary={true}
      badgeStyle={{top:0, right:0, zIndex:999}}
      style={{padding:'2px'}}
    >
      <IconButton tooltip="Un-annotated Papers">
        <NotificationsIcon />
      </IconButton>
    </Badge>

  </div>
);

export default RightIconMenu;
