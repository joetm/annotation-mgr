'use strict';

import React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/action/description';


const getSecText = (txt) => `${txt.type}: ${txt.mtime}, ${txt.size}`;


class ListFolderItem extends React.Component {

	getSubfolder (file) {
    	console.log('getting subfolder for', file.name);

		// TODO

	}

	getAnnotations (file) {
	    console.log('getting annotations for', file.name);

    	// TODO

		// get annotations from pdf on the fly

	}

	getDetails () {
		if (this.props.f.type === 'file') {
			this.getAnnotations(this.props.f);
		} else {
			this.getSubfolder(this.props.f);
		}
	}

    render () {
		let FIcon;
		if (this.props.f['type'] === "file") {
			FIcon = <FileIcon />;
		} else {
			FIcon = <FolderIcon />;
		}
		return (
			<ListItem
				leftAvatar={<Avatar icon={FIcon} />}
				primaryText={this.props.f.name}
				secondaryText={getSecText(this.props.f)}
				onClick={this.getDetails.bind(this)}
				autoGenerateNestedIndicator={true}
				primaryTogglesNestedList={true}
			/>
		);
    }

}

export default ListFolderItem;