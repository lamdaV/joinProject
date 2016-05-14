var React = require("react");
var Reflux = require("reflux");
var MessageStore = require("../reflux/messageStore.jsx");
var MessageActions = require("../reflux/messageActions.jsx");
var FriendItem = require("./FriendItem.jsx");

var FriendList = React.createClass({
  /*
    Listen to the MessageStore.
  */
  mixins: [Reflux.listenTo(MessageStore, "setFriendList")],

  /*
    Define propTypes.
  */
  propTypes: {
    inboxID: React.PropTypes.string.isRequired,
    propogator: React.PropTypes.func.isRequired
  },

  /*
    Set initial state values.
  */
  getInitialState: function() {
    return ({inboxID: this.props.inboxID, friends: null});
  },

  setFriendList: function(event, data) {
    // Only update when necessary.
    if (this.state.friends !== data.friends) {
      console.log("setFriendList data: " + JSON.stringify(data.friends));
      this.props.propogator(data.friends[0].friendID, data.friends[0].Email);
      this.setState({friends: data.friends});
    }
  },

  /*
    Inner propogator function. Passes data to parent component.
  */
  propogator: function(userID, email) {
    console.log("FriendList propogating userID: " + userID);
    this.props.propogator(userID, email);
  },

  /*
    Deletes a friend from the friends list.
  */
  deleteFriend: function(userID) {
    var friendTemp = this.state.friends;
    for (var i = 0; i < friendTemp.length; i++) {
      if (friendTemp[i].friendID === userID) {
        friendTemp.splice(i, 1);
        break;
      }
    }
    MessageStore.postDeleteFriend(this.state.inboxID, userID);
    this.setState({friends: friendTemp});
  },

  /*
    Get proper database values for friends list.
  */
  componentWillMount: function() {
    console.log("friend list mounting...");
    MessageActions.postFriendList(this.state.inboxID);
  },

  /*
    Create a FriendItem. Used with map function.
  */
  createFriendItem: function(item, index) {
    var linkStyle = {
      color: "#563d7c"
    };

    return (
      <FriendItem linkStyle = {linkStyle} key = {item.Email + index} UserID = {item.friendID} email = {item.Email} propogator = {this.propogator} deletePropogator = {this.deleteFriend} />
    );
  },

  /*
    Render the component.
  */
  render: function() {
    var panelBodyStyle = {
      minHeight: 860,
      maxHeight: 860,
      overflow: "auto"
    };

    return (
      <div className = "panel panel-primary">
        <div className = "panel-heading text-center" >
           Friends List
        </div>

        <div className = "panel-body" style = {panelBodyStyle}>
          <ul className="nav nav-pills nav-stacked">
            {this.state.friends === null ? null : this.state.friends.map(this.createFriendItem)}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = FriendList;
