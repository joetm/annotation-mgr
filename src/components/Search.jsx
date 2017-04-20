// import React from 'react';
import * as React from 'react'; // typescript

// import TextField from 'material-ui/TextField';
// import SearchIcon from 'material-ui/svg-icons/action/search';

export default class Search extends React.Component {

  constructor() {
    super();
    this.state = {
        isExpanded: false,
    };
  }

  toggle() {
    // TODO
      if (this.state.isExpanded) {
          console.log('close search bar');
          this.setState({isExpanded: false});
      } else {
          console.log('expand search bar');
          this.setState({isExpanded: true});
      }
  }

  render() {
    return (
        <div style={{display:'block'}}>
            <SearchIcon
                onClick={this.toggle.bind(this)}
                style={{float:'right', marginRight:'10px'}}
            />
            <TextField
                style={{float:'right', display: this.state.isExpanded ? 'block' : 'none'}}
                hintText="Search"
            />
        </div>
    );
  }

}
