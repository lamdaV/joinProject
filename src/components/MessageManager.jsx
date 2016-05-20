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
    return ({chatUserID: -1, chatUserEmail: ""});
  },

  /*
    Handle communication between FriendList component and Chat component.
  */
  chatSwitch: function(userID, email) {
    console.log("manager received userID: " + userID);
    console.log("manager received email: " + email);

    if (userID === null || email === null) {
      this.setState({chatUserID: -1, chatUserEmail: ""});
    } else {
      this.setState({chatUserID: userID, chatUserEmail: email});
    }
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
          <Chat inboxID = {this.props.inboxID} chatUserID = {this.state.chatUserID} chatUserEmail = {this.state.chatUserEmail} />
        </div>
      </div>
    );
  }
});

module.exports = MessageManager;
