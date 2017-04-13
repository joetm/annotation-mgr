'use strict';

// import React from 'react';
import * as React from 'react'; // typescript

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/action/description';


const ListFolder = (props) => {
    // const ConditionalSubHeader = props.folders.name ? <Subheader inset={true}>{props.folders.name}</Subheader> : null;
    return (
        <div style={{display: props.visible ? 'block' : 'none'}}>
            <Subheader inset={true}>{props.items.name}</Subheader>
            <Divider inset={true} />
            <List children={props.items} />
        </div>
    );
};

export default ListFolder;
