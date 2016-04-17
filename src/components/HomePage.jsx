var React = require("react");
var SignInPanel = require("./SignInPanel.jsx");
var CreateAccountPanel = require("./CreateAccountPanel.jsx");

var HomePage = React.createClass({
  clickTest: function(data) {
    // TODO: improve/rename
    this.props.history.push("/create");
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
