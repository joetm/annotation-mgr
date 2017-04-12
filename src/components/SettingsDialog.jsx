import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class SettingsDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeSettingsDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.closeSettingsDialog}
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
          ---TODO---
        </Dialog>
      </div>
    );
  }
}
