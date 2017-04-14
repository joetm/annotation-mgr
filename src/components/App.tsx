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

import ListFolderItem from "./ListFolderItem";

import Config from "../../config/config.js";

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
    items: any,
    view: string;
    dialogIsOpen: boolean;
    numUnannotated: number;
}


export default class App extends React.Component<any, MainState> {

    serverRequest: any;

    num : number = 0;

    state : MainState = {
        isLoading: false,
        progress: 0,
        items: [],
        view: 'search',
        dialogIsOpen: false,
        numUnannotated: 0,
    };

    processItems(folder) {
        return folder.map((f) => {
            let children = [];
            if ('children' in f) {
                children = this.processItems(f.children);
                // count unannotated papers
                if (f.name[0] !== '!' && f.name[0] !== '-') {
                    this.num += children.length;
                }
                // console.log('folder has children', children);
            }
            this.setState({
                numUnannotated: this.num,
            });
            return (
                <ListFolderItem
                    f={f}
                    children={children}
                />
            );
        });
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
                if (folderdata['children'] !== undefined) {
                    this.setState({
                        items: this.processItems(folderdata['children']),
                        isLoading: false,
                        dialogIsOpen: false,
                    });
                }
            });
    }

    componentDidMount() {

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
            if (!this.state.items.length) {
                this.fetchPapers();
            }
        }
    }

    openSettingsDialog() {
        this.setState({dialogIsOpen: true});
    }
    closeSettingsDialog() {
        this.setState({dialogIsOpen: false});
    }

    setNumPapers(num : number) {
        this.setState({
            numUnannotated: num,
        });
    }

    syncLiterature() {
        console.log('Sync Literature [TODO]');

        // TODO





    }

  	render() {

        const View = this.state.view === 'folder' ?
            <ListFolder
                items={this.state.items}
                visible={true}
                setNumPapers={this.setNumPapers.bind(this)}
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
