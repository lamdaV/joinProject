var React = require("react");
var Reflux = require("reflux");
var MessageStore = require("../reflux/messageStore.jsx");
var MessageActions = require("../reflux/messageActions.jsx");
var FriendItem = require("./FriendItem.jsx");


// TODO: Get rid of when database connection established.

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
    console.log("setFriendList data: " + JSON.stringify(data.friends));
    this.setState({friends: data.friends});
  },

  /*
    Inner propogator function. Passes data to parent component.
  */
  propogator: function(userID) {
    console.log("FriendList propogating userID: " + userID);
    this.props.propogator(userID);
  },

  /*
    Get proper database values for friends list.
  */
  componentWillMount: function() {
    console.log("friend list mounting...");
    // TODO: extrapolate this and with store.
    // this.props.propogator(friends[0].userID);
    // this.setState({friends: friends});
    MessageActions.postFriendList(1001);
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

    var linkStyle = {
      color: "#563d7c"
    };

    var createFriendItem = function(item, index) {
      return (
        <FriendItem linkStyle = {linkStyle} key = {item.Email + index} UserID = {item.friendID} email = {item.Email} propogator = {this.propogator}/>
      );
    }.bind(this);

    return (
      <div className = "panel panel-primary">
        <div className = "panel-heading text-center" >
           Friends List
        </div>

        <div className = "panel-body" style = {panelBodyStyle}>
          <ul className="nav nav-pills nav-stacked">
            {this.state.friends === null ? null : this.state.friends.map(createFriendItem)}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = FriendList;
