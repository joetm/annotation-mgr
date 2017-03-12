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
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.closeDialog}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Settings"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.closeDialog}
        >
          ---TODO---
        </Dialog>
      </div>
    );
  }
}
