var React = require("react");
var SignInPanel = require("./SignInPanel.jsx");
var CreateAccountPanel = require("./CreateAccountPanel.jsx");

var HomePage = React.createClass({


  render: function() {
    return (
      <div className = "row">
        <div className = "panel-group">
          <SignInPanel headerColor = "#563d7c"></SignInPanel>
          <CreateAccountPanel headerColor = "#563d7c"></CreateAccountPanel>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
