var React = require("react");
var FriendList = require("./FriendList.jsx");
var Chat = require("./Chat.jsx");

var MessageManager = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    inboxID: React.PropTypes.string.isRequired
  },

  /*
    Sets the initial state values.
  */
  getInitialState: function() {
    return ({chatUserID: -1});
  },

  /*
    Handle communication between FriendList component and Chat component.
  */
  chatSwitch: function(userID) {
    console.log("manager received userID: " + userID);
    this.setState({chatUserID: userID});
  },

  /*
    Renders the components.
  */
  render: function() {
    return (
      <div>
        <div className = "col-sm-4">
          <FriendList propogator = {this.chatSwitch} inboxID = {this.props.inboxID} />
        </div>

        <div className = "col-sm-8">
          <Chat chatUserID = {this.state.chatUserID} />
        </div>
      </div>
    );
  }
});

module.exports = MessageManager;
