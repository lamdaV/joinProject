var React = require("react");
var FriendItem = require("./FriendItem.jsx");

// TODO: Get rid of when database connection established.
var friends = [
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  },
  {
    email: "d@d.com",
    userID: 10002
  },
  {
    email: "a@a.com",
    userID: 4002
  },
  {
    email: "weed@420.com",
    userID: 420
  }
];

var FriendList = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    propogator: React.PropTypes.func
  },

  /*
    Set initial state values.
  */
  getInitialState: function() {
    return ({friends: null});
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
    this.props.propogator(friends[0].userID);
    this.setState({friends: friends});
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
        <FriendItem linkStyle = {linkStyle} key = {item.email + index} UserID = {item.userID} email = {item.email} propogator = {this.propogator}/>
      );
    }.bind(this);

    return (
      <div className = "panel panel-primary">
        <div className = "panel-heading text-center" >
           Friends List
        </div>

        <div className = "panel-body" style = {panelBodyStyle}>
          <ul className="nav nav-pills nav-stacked">
            {this.state.friends.map(createFriendItem)}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = FriendList;
