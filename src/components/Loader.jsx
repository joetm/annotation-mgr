var React = require('react');

import { Circle } from 'rc-progress';

const loaderStyle = {width:'20%',height:'auto'};


export default React.createClass({
  render: function() {
    if (!this.props.visible) {
        return null;
    }
    return (
        <div style={{margin:'20px'}}>
            <Circle percent={this.props.progress} strokeWidth="4" strokeColor="#D3D3D3" style={loaderStyle} />
        </div>
    );
  }
});
