var React = require("react");
var Reflux = require("reflux");
var MatchActions = require("../reflux/matchActions.jsx");
var MatchStore = require("../reflux/matchStore.jsx");

var MatchResults = React.createClass({
  mixins: [Reflux.listenTo(MatchStore, "setEmail")],

  /*
    Define propTypes.
  */
  propTypes: {
    score: React.PropTypes.number.isRequired,
    userID: React.PropTypes.number.isRequired
  },

  /*
    Set inital state values.
  */
  getInitialState: function() {
    return ({email: null});
  },

  setEmail: function(event, match) {
    /* eslint-disable */
    // TODO: Get chris to return emails. Race Condition.
    if (this.state.email === null) {
      console.log("setEmail data: " + JSON.stringify(match.email));
      this.setState({email: match.email[0].Email});
    }
    /* eslint-enable */
  },

  /*
    Handle Reject button.
  */
  handleReject: function(event) {
    // TODO: Get this to work with Kennan's stuff (remove from list?)
    event.preventDefault();
    console.log("Reject button clicked");
  },

  /*
    Handle Accept button.
  */
  handleAccept: function(event) {
    // TODO: Get this to work with Kennan's stuff. (add to friend list) (move to profile)
    event.preventDefault();
    console.log("Accept button clicked");
  },

  componentWillMount: function() {
    MatchActions.postGetEmail(this.props.userID);
  },

  /*
    Render the component.
  */
  render: function() {
    var panelHeadingStyle = {
      background: "#563d7c",
      minHeight: 60
    };

    var textStyle = {
      fontSize: 28
    };

    // TODO: Place results from database. Likely with props.
    return (
      <div className = "row">
        <div className = "panel panel-primary">
          <div style = {panelHeadingStyle} className = "panel-heading">
            <h5 style = {textStyle} className = "panel-title">
              {/* Email */}
              <div className = "col-sm-4 text-left">
                {this.state.email}
              </div>

              {/* Match Score */}
              <div className = "col-sm-4 text-center">
                {this.props.score}
              </div>

              {/* Acccept/Reject */}
              <div className = "col-sm-4 text-right">
                <button className = "btn btn-danger" type = "button" onClick = {this.handleReject} >Reject</button>
                <button className = "btn btn-success" onClick = {this.handleAccept} type = "button">Accept</button>
              </div>
            </h5>
          </div>

          {/* Heuristic Data */}
          {/* <div className = "panel-body">
            <h1>
              Determine
            </h1>
          </div> */}
        </div>

      </div>
    );
  }
});

module.exports = MatchResults;
