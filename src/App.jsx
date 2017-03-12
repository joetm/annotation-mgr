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

import Loader from './Loader.jsx';
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
      this.state = {
          isLoading: false,
          serverRequest: null,
          folders: [],
          progress: 0
      };
    }

    fetchConfig() {
        // TODO
    }

    fetchFolders() {
		// TODO
    }

    fetchPapers() {
        // TODO
        this.setState({
            isLoading: true,
            progress: 0
        });
    }

    componentDidMount() {
    	this.fetchConfig();
    	this.fetchPapers();
    }

    componentWillUnmount() {
      if (this.state.serverRequest) {
        serverRequest.abort();
      }
    }

  	render() {
  		  return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <AppBar
                        title="ANNOTATION MGR"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                      />
                    <Loader progress={this.state.progress} visible={this.state.isLoading} />
                    <ListFolder folders={this.state.folders} />
                    <Footer />
                </div>
            </MuiThemeProvider>
  		  );
  	}

}
