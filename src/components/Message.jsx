var React = require("react");

var Message = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    senderID: React.PropTypes.number,
    message: React.PropTypes.string
  },

  /*
    Render the component.
  */
  render: function() {
    // TODO:  Figure out this logic to get message styling.
    console.log("in Message");
    // var divClass = "alert alert-info";
    // if (this.props.chatUserID === this.props.senderID) {
    //   divClass = "alert alert-success";
    // }

    return (
      <div>
        {this.props.senderID}: <br />
        {this.props.message}
      </div>
    );
  }
});

module.exports = Message;
