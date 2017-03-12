var React = require('react');

import SearchIcon from 'material-ui/svg-icons/action/search';

export default React.createClass({
  state: {
    isExpanded: false,
  },
  expand: function () {
    console.log('expand search bar');
    this.setState(isExpanded: true);
  },
  render: function() {
    return (
        <SearchIcon onTouchTap={this.expand} />
    );
  }
});
