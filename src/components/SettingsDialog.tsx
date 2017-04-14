// import React from 'react';
// typescript
import * as React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SyncIcon from 'material-ui/svg-icons/navigation/refresh';

class SettingsDialog extends React.Component<any, any> {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.closeSettingsDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.closeSettingsDialog}
      />,
    ];
    return (
      <div>
          <Dialog
            title="Settings"
            actions={actions}
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.closeSettingsDialog}
          >
              <div onClick={this.props.syncLiterature}>
                  <SyncIcon />
                  Resync Literature
              </div>
              <div>
                  ---TODO---
              </div>
          </Dialog>
      </div>
    );
  }
}

export default SettingsDialog;
