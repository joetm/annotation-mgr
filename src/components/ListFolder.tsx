'use strict';

// import React from 'react';
import * as React from 'react'; // typescript

import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';


//            <Subheader inset={true}>{props.items.name}</Subheader>

const ListFolder = (props) => {
    // const ConditionalSubHeader = props.folders.name ? <Subheader inset={true}>{props.folders.name}</Subheader> : null;
    return (
        <div style={{display: props.visible ? 'block' : 'none'}}>
            <Divider inset={true} />
            <List children={props.items} />
        </div>
    );
};

export default ListFolder;
