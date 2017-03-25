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
import ListFolder from './ListFolder.jsx';
import SettingsMenu from './SettingsMenu.jsx';
import SettingsDialog from './SettingsDialog.jsx';
import Searchbox from './Searchbox.jsx'

import Config from '../config/config.js';


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
        this.state = {
            isLoading: false,
            serverRequest: null,
            papers: [],
            dialogOpen: false,
            filesVisible: false,
            numUnannotated: null,
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        if (this.state.serverRequest) {
            serverRequest.abort();
        }
    }

    openSettingsDialog() {
        this.setState({dialogOpen: true});
    }
    closeSettingsDialog() {
        this.setState({dialogOpen: false});
    }

    syncLiterature() {
        console.log('Sync Literature [TODO]');
        this.setState({
            filesVisible: false,
        });

        // TODO




    }

  	render() {
  		  return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <AppBar
                        title="ANNOTATION MGR"
                        iconElementRight={<SettingsMenu
                                openDialog={this.openSettingsDialog.bind(this)}
                                syncLiterature={this.syncLiterature.bind(this)}
                                numUnannotated={this.state.numUnannotated}
                            />}
                        showMenuIconButton={false}
                      />
                    <SettingsDialog
                        open={this.state.dialogOpen}
                        closeSettingsDialog={this.closeSettingsDialog.bind(this)}
                    />
                    <Loader
                    	progress={this.state.progress}
                    	visible={this.state.isLoading} />
                    <Searchbox
                    />
                </div>
            </MuiThemeProvider>
  		  );
  	}
}
