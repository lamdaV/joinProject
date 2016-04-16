var React = require("react");

var SignInPanel = React.createClass({
  getInitialState: function() {
      return {usernameText: "", passwordText: ""};
  },

  handleSubmit: function(element) {
    //TODO: Setup SQL handling.
    element.preventDefault();
    this.setState({usernameBsStyle: "error"});
    alert("sql stuff should happen.");
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
      <div style = {divStyle} className = "col-xs-6 col-sm-6 col-lg-6">
        <div className = "panel panel-primary">
          <div className = "panel-heading">
            <h3 className = "text-center"> Sign In </h3>
          </div>

          <div className = "row panel-body">
            <form onSubmit = {this.handleSubmit}>
              {/* Username field */}
              <div className = "col-sm-12">
                <input onChange = {this.onUserChange} type = "text" className="form-control" placeholder = "username" />
              </div>

              {/* Password field */}
              <div style = {divStyle} className = "col-sm-12">
                <input onChange = {this.onPasswordChange} type = "password" className="form-control" placeholder = "password" />
              </div>

              {/* Sign in button */}
              <div style = {divStyle} className = "col-sm-12">
                <button className = "btn btn-primary pull-right"> Sign in </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignInPanel;
