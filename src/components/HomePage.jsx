var React = require("react");
var SignInPanel = require("./SignInPanel.jsx");
var CreateAccountPanel = require("./CreateAccountPanel.jsx");

var HomePage = React.createClass({


  render: function() {
    return (
      <div className = "row">
        <SignInPanel></SignInPanel>
        <CreateAccountPanel></CreateAccountPanel>
      </div>
    );
  }
});

module.exports = HomePage;
