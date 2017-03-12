'use strict';

import React, {Component} from 'react';

import Paper from 'material-ui/Paper';


class BottomNavigationExampleSimple extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={0}>
        Citation Mgr.
      </Paper>
    );
  }
}

export default BottomNavigationExampleSimple;
