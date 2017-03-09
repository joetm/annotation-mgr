var React = require('react');
var Loading = require('react-loading');

const loaderStyle = {width:'100%',height:'100%'};

export default React.createClass({
  render: function() {
    if (!this.props.visible) {
        return null;
    }
    return (
        <div className="valign-wrapper center-align" style={loaderStyle}>
            <div className="valign center-align" style={{margin:'0 auto'}}>
                <Loading
                    id="loader"
                    type='bars'
                    width={400}
                    height={400}
                    color='#e3e3e3'
                />
            </div>
        </div>
    );
  }
});
