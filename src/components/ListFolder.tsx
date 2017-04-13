'use strict';

// import React from 'react';
import * as React from 'react'; // typescript

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/action/description';

import ListFolderItem from "./ListFolderItem";

const processItems = function (folder) {
    return folder.map((f) => {
        let children = [];
        if ('children' in f) {
            children = processItems(f.children);
            console.log('folder has children', children);
        }
        return (
            <ListFolderItem
                f={f}
                children={children}
            />
        );
    });
}

const ListFolder = (props) => {

    if (!props.folders || !props.folders.children || !props.folders.children.length) {
        return null;
    };

    let items = processItems(props.folders.children);

    // const ConditionalSubHeader = props.folders.name ? <Subheader inset={true}>{props.folders.name}</Subheader> : null;
    return (
        <div style={{display: props.visible ? 'block' : 'none'}}>
            <Subheader inset={true}>{props.folders.name}</Subheader>
            <Divider inset={true} />
            <List children={items} />
        </div>
    );

};

export default ListFolder;
