'use strict';

// import React from 'react';
import * as React from 'react'; // typescript

import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


//            <Subheader inset={true}>{props.items.name}</Subheader>

const ListFolder = (props) => {
    // const ConditionalSubHeader = props.folders.name ? <Subheader inset={true}>{props.folders.name}</Subheader> : null;
    return (
        <div style={{display: props.visible ? 'block' : 'none'}}>
            <List children={props.items} />
        </div>
    );
};

export default ListFolder;
