import React from 'react';

import TextField from 'material-ui/TextField';

import SearchIcon from 'material-ui/svg-icons/action/search';

export default class Search extends React.Component {

  constructor() {
    super();
    this.state = {
        isExpanded: false,
    };
  }

  expand() {
    // TODO
    console.log('expand search bar');
    this.setState({isExpanded: true});
  }

  render() {
    return (
        <div style={{display:'inline-block'}}>
            <SearchIcon
                onTouchTap={this.expand.bind(this)}
                style={{marginRight:'10px'}}
            />
            <TextField
                style={{display: this.state.isExpanded ? 'block' : 'none'}}
                hintText="Search"
            />
        </div>
    );
  }

}
