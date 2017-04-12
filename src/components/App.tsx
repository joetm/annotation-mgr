'use strict';

// import React from 'react';
import * as React from "react"; // typescript

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

import fetch from 'unfetch';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';

import Loader from './Loader';
import Searchbox from './Searchbox';
// import ListFolder from './ListFolder.jsx';
import SettingsMenu from './SettingsMenu.jsx';
import SettingsDialog from './SettingsDialog';

import Config from '../../config/config.js';


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


export interface MainProps {
    // TODO
}
export interface MainState {
    isLoading: boolean;
    serverRequest: any;
    progress: number;
    papers: any[];
    dialogOpen: boolean;
    filesVisible: boolean;
    numUnannotated: number;
}


export default class App extends React.Component<any, MainState> {

    state = {
        isLoading: false,
        serverRequest: null,
        progress: 0,
        papers: [],
        dialogOpen: false,
        filesVisible: false,
        numUnannotated: 0,
    };

    componentDidMount() {
    }

    componentWillUnmount() {
        if (this.state.serverRequest) {
            this.state.serverRequest.abort();
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
