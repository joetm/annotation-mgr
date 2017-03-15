'use strict';

import React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/action/description';


const getSecText = (txt) => `${txt.type}: ${txt.mtime}, ${txt.size}`;

const getAnnotations = function() {
    // TODO
    console.log('get annotations for', this);
}


class ListFolderItem extends React.Component {

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
				onClick={getAnnotations}
				autoGenerateNestedIndicator={true}
				primaryTogglesNestedList={true}
			/>
		);
    }

}

export default ListFolderItem;
