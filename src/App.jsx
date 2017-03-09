'use strict';

import React from 'react';

import fetch from 'unfetch';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import Mgt from './Mgt.jsx';


import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

const theme = getMuiTheme({
  palette: {
    primary1Color: pinkA200,
    primary2Color: cyan700,
    primary3Color: grey400
  }
});

export default class App extends React.Component {

    constructor() {
      super();
    	// TODO
    }

    fetchCitations() {
		// TODO
    }

    fetchPapers() {
    // TODO
    }

  	render() {
  		  return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <Mgt />
                </div>
            </MuiThemeProvider>
  		  );
  	}

}
