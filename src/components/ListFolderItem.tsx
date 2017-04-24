'use strict';

//import React from 'react';
import * as React from 'react'; // typescript

import 'unfetch/polyfill';

import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';

import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/action/description';

import Annotations from './Annotations';


// http://stackoverflow.com/a/14919494/426266
function humanFileSize(bytes) {
    const si = true;
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}


const nestedListStyle = {
    marginLeft: '1em',
};
const annotationsContainerStyle = {
    marginLeft: '4.5em',
};
const metadataContainerStyle = {
    marginLeft: '4.5em',
    marginBottom: '1em',
};
const iconStyles = {
    important: {
        backgroundColor: '#FFBBBB',
    },
    read: {
        backgroundColor: '#CCCCCC',
    },
    unread: {
        backgroundColor: '#202020',
    },
};
const fileItemStyle = {
};
const folderItemStyle = {
    color: '#EEEEEE',
};


export interface MainState {
    annotations: any;
    metadata: any;
}


const getSecText = (f) => {
    if (f.type !== 'folder') {
        return `${f.mtime}, ${humanFileSize(f.size)}`;
    }
    return '';
};


class ListFolderItem extends React.Component<any, MainState> {

    serverRequest : any;

    state : MainState = {
        annotations: [],
        metadata: null,
    };

    getMetadata (file) {
        console.log('getting metadata for', file.path);

        // TODO

        // TODO - get this from elasticsearch

        // for now:
        // get annotations from pdf on the fly
        // via flask server

        const urlpath = encodeURIComponent(file.path);

        const URL = `http://127.0.0.1:5000/metadata?path=${urlpath}`;

        this.serverRequest = fetch(URL)
            .then(r => r.json())
            .then((metadata) => {
                console.log(file.path, metadata);
                this.setState({
                    metadata
                });
            });
    }

    getAnnotations (file) {
        console.log('getting annotations for', file.path);

        // TODO

        // TODO - get this from elasticsearch

        // for now:
        // get annotations from pdf on the fly
        // via flask server

        const urlpath = encodeURIComponent(file.path);

        const URL = `http://127.0.0.1:5000/annotation?path=${urlpath}`;

        this.serverRequest = fetch(URL)
            .then(r => r.json())
            .then((annotationdata) => {
                console.log(file.path, annotationdata);
                this.setState({
                    annotations: annotationdata,
                });
            });
    }

    componentWillUnmount() {
        if (this.serverRequest) {
            this.serverRequest.abort();
        }
    }

    flareTitle() {
        // TODO
    }

    getDetails () {
        if (this.props.children) {
            console.log('num children', this.props.children.length);
        }
        if (this.props.f.type === 'file') {
            if (!this.state.annotations.length) {
                console.log('show annotations');
                this.getMetadata(this.props.f);
                this.getAnnotations(this.props.f);
                if (!this.state.annotations.length) {
                    // no annotations found for this file
                    this.flareTitle();
                }
            } else {
                console.log('hide annotations');
                this.setState({
                    annotations: [],
                    metadata: null,
                });
            }
        }
    }

    getItemIcon() {
        if (this.props.f['type'] === "file") {
            return <FileIcon />;
        } else {
            return <FolderIcon />;
        }
    }

    getItemIconStyle() {
        let iconStyle = iconStyles.unread;
        if (this.props.f['name'][0] === '-') {
            iconStyle = iconStyles.read;
        } else if (this.props.f['name'][0] === '!') {
            iconStyle = iconStyles.important;
        };
        return iconStyle;
    }

    buildPrimaryTitle() {
        let primaryText = this.props.f.name;
        if (this.props.children.length) {
            primaryText = primaryText + ' (' + this.props.children.length + ')';
        }
        return primaryText;
    }

    render () {

        const FIcon = this.getItemIcon();

        const iconStyle = this.getItemIconStyle();

        const primaryText = this.buildPrimaryTitle();

        // console.log(this.props.f.children);
        // console.log(this.props.children);

        return (
            <div>
                <ListItem
                    leftAvatar={<Avatar
                                    icon={FIcon}
                                    style={iconStyle}
                                />}
                    primaryText={primaryText}
                    key={this.props.f.hash}
                    secondaryText={getSecText(this.props.f)}
                    onClick={this.getDetails.bind(this)}
                    autoGenerateNestedIndicator={true}
                    primaryTogglesNestedList={true}
                    insetChildren={true}
                    nestedItems={this.props.children}
                    nestedListStyle={nestedListStyle}
                />
                {
                    this.state.metadata && (this.state.metadata['/Title'] || this.state.metadata['/Author']) ? (
                        <div style={metadataContainerStyle}>
                            <div style={{display: this.state.metadata['/Title'] ? 'block' : 'none'}}>Title: {this.state.metadata && this.state.metadata['/Title']}</div>
                            <div style={{display: this.state.metadata['/Author'] ? 'block' : 'none'}}>Author: {this.state.metadata && this.state.metadata['/Author']}</div>
                        </div>
                    ) : null
                }
                <div style={{display: this.state.annotations.length ? 'block' : 'none'}}>
                    <div style={annotationsContainerStyle}>
                        <Annotations
                            rows={this.state.annotations}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default ListFolderItem;
