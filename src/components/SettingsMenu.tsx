// import React from 'react';
import * as React from 'react'; // typescript

// import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import SyncIcon from 'material-ui/svg-icons/navigation/refresh';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import SearchIcon from 'material-ui/svg-icons/action/search';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

// import Search from './Search.jsx'

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

/*
    <IconButton><SyncIcon onTouchTap={props.syncLiterature} /></IconButton>
*/

// const RightIconMenu = (props) => (
class RightIconMenu extends React.Component<any, any> {
    render() {
        return (
          <div>

            <IconButton style={{display: this.props.view !== 'folder' ? 'inline-block' : 'none'}}><FolderIcon onClick={this.props.switchView} /></IconButton>
            <IconButton style={{display: this.props.view === 'folder' ? 'inline-block' : 'none'}}><SearchIcon onClick={this.props.switchView} /></IconButton>

            <IconButton><SettingsIcon onTouchTap={this.props.openDialog} /></IconButton>

            <Badge
              badgeContent={this.props.numUnannotated}
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
    }
}

export default RightIconMenu;
