'use strict';

// import React from 'react';
import * as React from "react"; // typescript

import Snackbar from 'material-ui/Snackbar';

export default class Growler extends React.Component<any, any> {

  // handleRequestClose = () => {
  //   this.setState({
  //     open: false,
  //   });
  // };

  render() {
    return (
	    <Snackbar
	      open={this.props.open}
	      message={this.props.message}
	      autoHideDuration={3000}
	    />
    );
  }
}