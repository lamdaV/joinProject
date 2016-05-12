var React = require("react");

var Message = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    timeStamp: React.PropTypes.string.isRequired,
    inboxID: React.PropTypes.string.isRequired,
    senderID: React.PropTypes.number.isRequired,
    message: React.PropTypes.string.isRequired
  },

  /*
    Render the component.
  */
  render: function() {
    /* eslint-disable */
    var divClass = "alert alert-info";
    if (this.props.inboxID == this.props.senderID) {
      divClass = "alert alert-success";
    }
    /* eslint-enable */

    return (
      <div className = {divClass} >
        <b> {this.props.timeStamp} </b>
        {this.props.senderID}: <br />
        {this.props.message}
      </div>
    );
  }
});

module.exports = Message;
