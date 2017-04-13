'use strict';

//import React from 'react';
import * as React from 'react'; // typescript

import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';

import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/action/description';

import 'unfetch/polyfill';


const nestedListStyle = {
	marginLeft: '1em'
};

const annotationsContainerStyle = {
	marginLeft: '4.5em',
};

const iconStyles = {
	important: {
		backgroundColor: '#FFCCCC',
	},
	read: {
		backgroundColor: '#CCFFCC',
	},
	unread: {
		backgroundColor: '#CCCCCC',
	},
};


const getSecText = (f) => {
	if (f.type !== 'folder') {
		return `${f.type}: ${f.mtime}, ${f.size}`;
	}
	return '';
};


class ListFolderItem extends React.Component<any, any> {

	serverRequest : any;

	state = {
		annotations: []
	};

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
                	annotations: annotationdata
                });

            });
	}

    componentWillUnmount() {
        if (this.serverRequest) {
            this.serverRequest.abort();
        }
    }

	getDetails () {
		if (this.props.f.type === 'file') {
			this.getAnnotations(this.props.f);
		}
	}

    render () {
		let FIcon;
		if (this.props.f['type'] === "file") {
			FIcon = <FileIcon />;
		} else {
			FIcon = <FolderIcon />;
		}
		let iconStyle = iconStyles.unread;
		if (this.props.f['name'][0] === '-') {
			iconStyle = iconStyles.important;
		} else if (this.props.f['name'][0] === '!') {
			iconStyle = iconStyles.important;
		};

		let annotations = [];
		if (this.state.annotations.length) {
			annotations = this.state.annotations.map((annotation) => (
				<div>{annotation[0]}: {annotation[1]}</div>
			));
		}

		return (
			<div>
				<ListItem
					leftAvatar={<Avatar
									icon={FIcon}
									style={iconStyle}
								/>}
					primaryText={this.props.f.name}
					secondaryText={getSecText(this.props.f)}
					onClick={this.getDetails.bind(this)}
					autoGenerateNestedIndicator={true}
					primaryTogglesNestedList={true}
					insetChildren={true}
					nestedItems={this.props.children}
					nestedListStyle={nestedListStyle}
				/>
				<div style={annotationsContainerStyle}>
					{annotations}
				</div>
			</div>
		);
    }

}

export default ListFolderItem;
