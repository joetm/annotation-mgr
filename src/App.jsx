'use strict';

import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import fetch from 'unfetch';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';

import Footer from './Footer.jsx';
import ListFolder from './ListFolder.jsx';

import {
  lightBlue500,
  indigo500,
  cyan50,
  pink500,
  grey500,
  Black, White
} from 'material-ui/styles/colors';

const theme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    primary2Color: indigo500,
    primary3Color: pink500
  }
});

export default class App extends React.Component {

    constructor() {
      super();
    	// TODO
    }

    fetchConfig() {
    // TODO
    }

    fetchFolders() {
		// TODO
    }

    fetchPapers() {
    // TODO
    }

  	render() {
  		  return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <AppBar
                        title="CITATION MGR"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                      />
                    <ListFolder />
                    <Footer />
                </div>
            </MuiThemeProvider>
  		  );
  	}

}
