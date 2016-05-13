var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");
var GameActions = require("../reflux/gameActions.jsx");
var GameStore = require("../reflux/gameStore.jsx");
var UserActions = require("../reflux/userActions.jsx");
var UserStore = require("../reflux/userStore.jsx");
var LibraryItem = require("./LibraryItem.jsx");

/* global localStorage */
var LibraryPage = React.createClass({
  /*
    Listen to the AuthStore and GameStore.
  */
  mixins: [Reflux.listenTo(AuthStore, "verify"), Reflux.listenTo(GameStore, "setLibrary")],

  /*
    Define propTypes.
  */
  propTypes: {
    params: React.PropTypes.object
  },

  /*
    Set router to dynamic pushing.
  */
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Set initial state values.
  */
  getInitialState: function() {
    return ({libraryID: "", library: null});
  },

  /*
    Updates the library on delete.
  */
  updateLibrary: function(gameID) {
    console.log("updateLibrary gameID: " + gameID);
    var libraryTemp = this.state.library;
    for (var i = 0; i < libraryTemp.length; i++) {
      if (libraryTemp[i].GameID === gameID) {
        libraryTemp.splice(i, 1);
      }
    }

    this.setState({library: libraryTemp});
  },

  /*
    If user is authenticated and the user is not trying to access someone else's preference page, setState to the props libraryID. Otherwise, push to home.
  */
  verify: function(event, status) {
    if (status) {
      console.log("preference verify passed");
      if (localStorage.getItem("UserID") === this.props.params.libraryID) {
        this.setState({libraryID: this.props.params.libraryID});
      } else {
        this.context.router.push("/home");
      }
    } else {
      console.log("preference verify failed");
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  /*
    Sets the user library.
  */
  setLibrary: function(event, gameData) {
    if (gameData.library) {
      console.log("setLibrary data: " + JSON.stringify(gameData.library));
      this.setState({library: gameData.library});
    }
  },

  /*
    Create a library item. Used with map.
  */
  createLibraryItem: function(item, index) {
    var linkStyle = {
      color: "magenta"
    };

    return (
      <LibraryItem key = {item.GameID + "" + index} item = {item} linkStyle = {linkStyle} libraryID = {this.state.libraryID} deletePropogator = {this.updateLibrary} />
    );
  },

  /*
    Authenticate before mounting.
  */
  componentWillMount: function() {
    AuthActions.postAuthenticate();
    GameActions.postGetLibrary(this.props.params.libraryID);
  },

  /*
    Render the component.
  */
  render: function() {
    return (
      <div>
        <h1> LibraryPage of User: {this.state.libraryID} </h1>

        <div className = "col-sm-12">
          <ul className = "nav nav-pills nav-stacked">
            {this.state.library === null ? null : this.state.library.map(this.createLibraryItem)}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = LibraryPage;
