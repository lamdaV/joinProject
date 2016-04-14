var React = require("react");

var SignInPanel = React.createClass({
  getInitialState: function() {
      return {userInitialClick: true, passwordInitialClick: true, usernameText: "username", passwordText: "password"};
  },

  handleSubmit: function(element) {
    //TODO: Setup SQL handling.
    element.preventDefault();
    alert("sql stuff should happen.");
  },

  handleClick: function(element) {
    if (this.state.userInitialClick && element.target.value === "username") {
      this.setState({userInitialClick: false, usernameText: ""});
    } else if (this.state.passwordInitialClick && element.target.value === "password") {
      this.setState({passwordInitialClick: false, passwordText: ""});
    }
  },

  onUserChange: function(data) {
    this.setState({usernameText: data.target.value});
  },

  onPasswordChange: function(data) {
    this.setState({passwordText: data.target.value})
  },

  render: function() {
    var divStyle = {
      marginTop: 10
    };

    return (
      <div style = {divStyle} className = "col-sm-4">
        <div className = "panel panel-primary">
          <div className = "panel-heading">
            <h3> Sign In </h3>
          </div>

          <div className = "row panel-body">
            <form onSubmit = {this.handleSubmit}>
              <div className = "col-sm-12">
                <input onChange = {this.onUserChange} onClick = {this.handleClick} type = "text" className="form-control" value = {this.state.usernameText}/>
              </div>

              <div className = "col-sm-12">
                <input onChange = {this.onPasswordChange} onClick = {this.handleClick} type = "password" className="form-control" value = {this.state.passwordText}/>
              </div>

              <div className = "col-sm-12">
                <button className = "btn btn-primary"> Sign in </button>
              </div>
            </form>


          </div>

        </div>
      </div>
    );
  }
});

module.exports = SignInPanel;
