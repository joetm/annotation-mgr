'use strict';

// import React from 'react';
import * as React from "react"; // typescript

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

// import fetch from 'unfetch';
import 'unfetch/polyfill';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import Loader from './Loader';
import Searchbox from './Searchbox';
import ListFolder from './ListFolder';
import SettingsMenu from './SettingsMenu';
import SettingsDialog from './SettingsDialog';

// import Config from '../../config/config.js';


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
    progress: number;
    folders: any,
    view: string;
    dialogIsOpen: boolean;
    numUnannotated: number;
}


export default class App extends React.Component<any, MainState> {

    serverRequest: any;

    state : MainState = {
        isLoading: false,
        progress: 0,
        folders: [],
        view: 'search',
        dialogIsOpen: false,
        numUnannotated: 0,
    };

    fetchConfig() {
        // TODO
    }

    fetchPapers() {
        //
        console.log('fetching papers');
        // fetch the data
        const URL = "./data/folders.json";
        this.serverRequest = fetch(URL)
            .then(r => r.json())
            .then((folderdata) => {
                console.log(URL, folderdata);

                console.log(folderdata);

                if (folderdata && folderdata['children'] !== undefined) {
                    const numUnannotated = folderdata['children'].length ? folderdata['children'].length : 0;
                    this.setState({
                        folders: folderdata,
                        isLoading: false,
                        dialogIsOpen: false,
                        numUnannotated, // TODO
                    });
                }
            });
    }

    componentDidMount() {
        this.fetchConfig();
    }

    componentWillUnmount() {
        if (this.serverRequest) {
            this.serverRequest.abort();
        }
    }

    switchView() {
        console.log('switch between search and folder view');
        if (this.state.view === 'folder') {
            this.setState({
                view: 'search',
                progress: 0, // TODO
                isLoading: false,
            });
        } else {
            this.setState({
                view: 'folder',
                isLoading: true,
                progress: 0, // TODO
            });
            this.fetchPapers();
        }
    }

    openSettingsDialog() {
        this.setState({dialogIsOpen: true});
    }
    closeSettingsDialog() {
        this.setState({dialogIsOpen: false});
    }

    syncLiterature() {
        console.log('Sync Literature [TODO]');

        // TODO




    }

  	render() {

        const View = this.state.view === 'folder' ?
            <ListFolder
                folders={this.state.folders}
                visible={true}
            /> :
            <Searchbox
            />;

        return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <AppBar
                        title="ANNOTATION MGR"
                        iconElementRight={<SettingsMenu
                                view={this.state.view}
                                openDialog={this.openSettingsDialog.bind(this)}
                                syncLiterature={this.syncLiterature.bind(this)}
                                switchView={this.switchView.bind(this)}
                                numUnannotated={this.state.numUnannotated}
                            />}
                        showMenuIconButton={false}
                      />
                    <SettingsDialog
                        open={this.state.dialogIsOpen}
                        closeSettingsDialog={this.closeSettingsDialog.bind(this)}
                    />
                    <Loader
                    	progress={this.state.progress}
                    	visible={this.state.isLoading} />
                    {View}
                </div>
            </MuiThemeProvider>
        );
  	}
}
