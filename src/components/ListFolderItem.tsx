'use strict';

//import React from 'react';
import * as React from 'react'; // typescript

import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';

import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/action/description';


const nestedListStyle = {
	marginLeft: '1em'
};


const getSecText = (txt) => `${txt.type}: ${txt.mtime}, ${txt.size}`;


class ListFolderItem extends React.Component<any, any> {

	getAnnotations (file) {
	    console.log('getting annotations for', file.name);

    	// TODO

		// get annotations from pdf on the fly


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
		const important = this.props.f['name'][0] === '!' ? true : false;
		return (
			<ListItem
				leftAvatar={<Avatar icon={FIcon} style={{backgroundColor: important ? '#FFCCCC' : '#FFFFFF'}} />}
				primaryText={this.props.f.name}
				secondaryText={getSecText(this.props.f)}
				onClick={this.getDetails.bind(this)}
				autoGenerateNestedIndicator={true}
				primaryTogglesNestedList={true}
				insetChildren={true}
				nestedItems={this.props.children}
				nestedListStyle={nestedListStyle}
			/>
		);
    }

}

export default ListFolderItem;