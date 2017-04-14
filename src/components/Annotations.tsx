'use strict';

// import React from 'react';
import * as React from 'react'; // typescript

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const AnnotationTable = (props) => (
	<Paper zDepth={1}>
	  <Table selectable={false}>
	    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
	      <TableRow selectable={false}>
	        <TableHeaderColumn>Annotation</TableHeaderColumn>
	        <TableHeaderColumn>page</TableHeaderColumn>
	      </TableRow>
	    </TableHeader>
	    <TableBody displayRowCheckbox={false}>
	    	{
	    		props.rows.map((row) => (
			      <TableRow selectable={false} striped={true}>
			        <TableRowColumn style={{whiteSpace:'normal',wordWrap:'break-word'}}>{row[1]}</TableRowColumn>
			        <TableRowColumn>{row[0]}</TableRowColumn>
			      </TableRow>
	    		))
	    	}
	    </TableBody>
	  </Table>
	</Paper>
);

export default AnnotationTable;
