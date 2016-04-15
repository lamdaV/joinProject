var React = require("react");
var ReactDOM = require("react-dom");
var SignInPanel = require("./components/SignInPanel.jsx");
var CreateAccountPanel = require("./components/CreateAccountPanel.jsx");

ReactDOM.render(<SignInPanel />, document.getElementById("signIn"));
ReactDOM.render(<CreateAccountPanel />, document.getElementById("createAccount"));
