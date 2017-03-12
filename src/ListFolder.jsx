'use strict';

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/file/cloud';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';


const mapFolders = () => {

}

const getSecText = (txt) => `${txt.type}: ${txt.mtime}, ${txt.size}`;

const ListFolder = (props) => {
    if (!props.folders.children || !props.folders.children.length) {
        return null;
    };
    const folders = props.folders.children.map((f) => {
        // TODO
        // let FIcon = <FileIcon />;
        // if (f['type'] !== "file") {
        //     FIcon = <FileFolder />;
        // }
        // console.log(FIcon);
        return (
            <ListItem
                leftAvatar={<Avatar icon={<FileIcon />} />}
                primaryText={f.name}
                secondaryText={getSecText(f)}
            />
        );
    });
    // const ConditionalSubHeader = props.folders.name ? <Subheader inset={true}>{props.folders.name}</Subheader> : null;
    return (
        <div style={{display: props.visible ? 'block' : 'none'}}>
        <Subheader inset={true}>{props.folders.name}</Subheader>
        <Divider inset={true} />
        <List>
          {folders}
        </List>
        </div>
    );
};

export default ListFolder;
