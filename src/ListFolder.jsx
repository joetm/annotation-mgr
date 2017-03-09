'use strict';

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';


//      <Subheader inset={true}>Folders</Subheader>

const ListFolder = () => (
    <div>
    <Divider inset={true} />
    <List>
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        primaryText="Photos"
        secondaryText="Jan 9, 2014"
      />
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        primaryText="Recipes"
        secondaryText="Jan 17, 2014"
      />
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        primaryText="Work"
        secondaryText="Jan 28, 2014"
      />
    </List>
    </div>
);

export default ListFolder;

