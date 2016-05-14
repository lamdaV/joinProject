var React = require("react");

var MatchResults = React.createClass({
  /*
    Define propTypes.
  */
  propTypes: {
    score: React.PropTypes.number.isRequired,
    email: React.PropTypes.string.isRequired,
    userID: React.PropTypes.number.isRequired,
    rejectHandler: React.PropTypes.func.isRequired,
    acceptHandler: React.PropTypes.func.isRequired
  },

  /*
    Set inital state values.
  */
  getInitialState: function() {
    return ({email: this.props.email});
  },

  /*
    Handle Reject button.
  */
  handleReject: function(event) {
    event.preventDefault();
    console.log("Reject button clicked");
    this.props.rejectHandler(this.props.userID);
  },

  /*
    Handle Accept button.
  */
  handleAccept: function(event) {
    event.preventDefault();
    console.log("Accept button clicked");
    this.props.acceptHandler(this.props.userID);
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
                <button className = "btn btn-danger" type = "button" onClick = {this.handleReject}> Reject </button>
                <button className = "btn btn-success" onClick = {this.handleAccept} type = "button"> Accept </button>
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
