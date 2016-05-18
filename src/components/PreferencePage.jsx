var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var AuthActions = require("../reflux/authActions.jsx");
var AuthStore = require("../reflux/authStore.jsx");
var PreferenceActions = require("../reflux/preferenceActions.jsx");
var PlatformRadioGroup = require("./PlatformRadioGroup.jsx");
var GenreRadioGroup = require("./GenreRadioGroup.jsx");

/* global localStorage */
var PreferencesPage = React.createClass({
  /*
    Listen to the AuthStore.
  */
  mixins: [Reflux.listenTo(AuthStore, "verify")],

  /*
    Define propTypes.
  */
  propTypes: {
    params: React.PropTypes.object
  },

  /*
    Set router for dynamic pushing.
  */
  contextTypes: {
    router: React.PropTypes.object
  },

  /*
    Set the intial state.
  */
  getInitialState: function() {
    return ({preferencesID: ""});
  },

  /*
    If the user is authenticated and the user is not attempting to acccess someone else's preferences, leave the state unchanged.
    Otherwise, log the user out and push to home.
  */
  verify: function(event, status) {
    if (status) {
      console.log("preferences verify passed");
      if (this.state.preferencesID !== localStorage.getItem("UserID")) {
        console.log("preferences illegal access");
        UserActions.logout();
        this.context.router.push("/home");
      }
    } else {
      console.log("preferences verify failed");
      UserActions.logout();
      this.context.router.push("/home");
    }
  },

  componentWillMount: function() {
    AuthActions.postAuthenticate();
    this.setState({preferencesID: this.props.params.preferencesID});
  },

  componentWillReceiveProps: function(nextProps) {
    AuthActions.postAuthenticate();
    this.setState({inboxID: nextProps.params.preferencesID});
  },

  handleSubmit: function(event) {
    console.log("handling preference submission");
    event.preventDefault();

    var platform = this.refs.platformRadio.state.selectedValue;
    var genre = this.refs.genreRadio.state.selectedValue;

    PreferenceActions.postPlatformList(localStorage.getItem("UserID"), platform);
    PreferenceActions.postGenreList(localStorage.getItem("UserID"), genre);

    this.context.router.push("/home");
  },

  render: function() {
    var buttonStyle = {
      background: "#563d7c"
    };
    return (
      <div>
        <h1>Preferences for User {this.state.preferencesID}</h1>
        <h4>Favorite platform: </h4>
        <PlatformRadioGroup />

        <h4>Favorite genre: </h4>
        <GenreRadioGroup />
        <button style={buttonStyle} className="btn btn-default" type="submit" onClick={this.handleSubmit}>Apply</button>
      </div>
    );
  }
});

module.exports = PreferencesPage;
