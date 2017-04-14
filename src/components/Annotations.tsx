'use strict';

// import React from 'react';
import * as React from 'react'; // typescript

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const annotationStyle = {
    whiteSpace:'normal',
    wordWrap:'break-word',
    cursor: 'pointer',
};

// const AnnotationTable = (props) => (
class AnnotationTable extends React.Component<any, {}> {
    copyToClipboard(selectedRows) {
        // TODO
    }
    render() {
        return (
            <Paper zDepth={1}>
              <Table selectable={true} multiSelectable={true} onRowSelection={this.copyToClipboard.bind(this)}>
                <TableHeader adjustForCheckbox={true} displaySelectAll={true}>
                  <TableRow selectable={false}>
                    <TableHeaderColumn>Annotation</TableHeaderColumn>
                    <TableHeaderColumn>page</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={true} deselectOnClickaway={false}>
                    {
                        this.props.rows.map((row) => (
                          <TableRow selectable={true}>
                            <TableRowColumn style={annotationStyle}>{row[1]}</TableRowColumn>
                            <TableRowColumn>{row[0]}</TableRowColumn>
                          </TableRow>
                        ))
                    }
                </TableBody>
              </Table>
            </Paper>
        );
    }
}

export default AnnotationTable;
