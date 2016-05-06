var React = require("react");

var MatchResults = React.createClass({
  /*
    Handle Reject button.
  */
  handleReject: function(event) {
    // TODO: Get this to work with Kennan's stuff
    event.preventDefault();
    console.log("Reject button clicked");
  },

  /*
    Handle Accept button.
  */
  handleAccept: function() {
    // TODO: Get this to work with Kennan's stuff.
    event.preventDefault();
    console.log("Accept button clicked");
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
                [Email]
              </div>

              {/* Match Score */}
              <div className = "col-sm-4 text-center">
                [Matching Score]
              </div>

              {/* Acccept/Reject */}
              <div className = "col-sm-4 text-right">
                <button className = "btn btn-danger" type = "button" onClick = {this.handleReject} >Reject</button>
                <button className = "btn btn-success" onClick = {this.handleAccept} type = "button">Accept</button>
              </div>
            </h5>
          </div>

          {/* Heuristic Data */}
          <div className = "panel-body">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h1>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = MatchResults;
