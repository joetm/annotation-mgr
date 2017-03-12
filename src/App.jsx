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
            folders: [],
            progress: 0,
            dialogOpen: false,
        };
    }

    fetchConfig() {
        // TODO
    }

    fetchPapers() {
        //
        this.setState({
            isLoading: true,
            progress: 0
        });
        // fetch the data
        const URL = "./data/folders.json";
        this.serverRequest = fetch(URL)
        .then(r => r.json())
        .then((folderdata) => {
            console.log(URL, folderdata);
            this.setState({
                folders: folderdata,
                isLoading: false
            });
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

    openDialog() {
        this.setState({dialogOpen: true});
    }
    closeDialog() {
        this.setState({dialogOpen: false});
    }

  	render() {
  		  return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <AppBar
                        title="ANNOTATION MGR"
                        iconElementRight={<SettingsMenu openDialog={this.openDialog.bind(this)} />}
                        showMenuIconButton={false}
                      />
                    <SettingsDialog
                        open={this.state.dialogOpen}
                        closeDialog={this.closeDialog.bind(this)}
                    />
                    <Loader progress={this.state.progress} visible={this.state.isLoading} />
                    <ListFolder folders={this.state.folders} />
                </div>
            </MuiThemeProvider>
  		  );
  	}

}
