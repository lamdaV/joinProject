var React = require("react");
var SignInPanel = require("./SignInPanel.jsx");
var CreateAccountPanel = require("./CreateAccountPanel.jsx");

var HomePage = React.createClass({
  clickTest: function(data) {
    this.props.history.push("/testpage");
  },

  render: function() {
    return (
      <div className = "row">
        <SignInPanel></SignInPanel>
        <CreateAccountPanel onClick = {this.clickTest}></CreateAccountPanel>
      </div>
    );
  }
});

module.exports = HomePage;
