var React = require("react");
var ReactDOM = require("react-dom");
var Message = require("./Message.jsx");

// TODO: remove once connected with database.
var messageHistory = [
  {
    sender: 10002,
    message: "sup"
  },
  {
    sender: 420,
    message: "nm you"
  },
  {
    sender: 10002,
    message: "you got that dank weed"
  },
  {
    sender: 420,
    message: "duh. want a wiff?"
  },
  {
    sender: 10002,
    message: "no noob get on the crack powder"
  },
  {
    sender: 420,
    message: "nah man smoke weed erry day"
  },
  {
    sender: 10002,
    message: "sup"
  },
  {
    sender: 420,
    message: "nm you"
  },
  {
    sender: 10002,
    message: "you got that dank weed"
  },
  {
    sender: 420,
    message: "duh. want a wiff?"
  },
  {
    sender: 10002,
    message: "no noob get on the crack powder"
  },
  {
    sender: 420,
    message: "nah man smoke weed erry day"
  },
  {
    sender: 10002,
    message: "sup"
  },
  {
    sender: 420,
    message: "nm you"
  },
  {
    sender: 10002,
    message: "you got that dank weed"
  },
  {
    sender: 420,
    message: "duh. want a wiff?"
  },
  {
    sender: 10002,
    message: "no noob get on the crack powder"
  },
  {
    sender: 420,
    message: "nah man smoke weed erry day"
  },
  {
    sender: 10002,
    message: "sup"
  },
  {
    sender: 420,
    message: "nm you"
  },
  {
    sender: 10002,
    message: "you got that dank weed"
  },
  {
    sender: 420,
    message: "duh. want a wiff?"
  },
  {
    sender: 10002,
    message: "no noob get on the crack powder"
  },
  {
    sender: 420,
    message: "nah man smoke weed erry day"
  },
  {
    sender: 10002,
    message: "sup"
  },
  {
    sender: 420,
    message: "nm you"
  },
  {
    sender: 10002,
    message: "you got that dank weed"
  },
  {
    sender: 420,
    message: "duh. want a wiff?"
  },
  {
    sender: 10002,
    message: "no noob get on the crack powder"
  },
  {
    sender: 420,
    message: "nah man smoke weed erry day"
  },
  {
    sender: 10002,
    message: "sup"
  },
  {
    sender: 420,
    message: "nm you"
  },
  {
    sender: 10002,
    message: "you got that dank weed"
  },
  {
    sender: 420,
    message: "duh. want a wiff?"
  },
  {
    sender: 10002,
    message: "no noob get on the crack powder"
  },
  {
    sender: 420,
    message: "nah man smoke weed erry day"
  }
];

var Chat = React.createClass({
  /*
    Set initial state values.
  */
  getInitialState: function() {
    return ({chatUserID: -1, messages: null, typedMessage: ""});
  },

  /*
    Handle each time a user types a character in inputbox.
  */
  handleInputChange: function(event) {
    console.log("typing...");
    this.setState({typedMessage: event.target.value});
  },

  /*
    Handle how a submission to the chat is made.
  */
  handleSubmit: function(event) {
    console.log("handling message submission");
    event.preventDefault();
    var message = this.state.typedMessage;
    var messageHistory = this.state.messages;
    console.log("entry: " + message);
    // TODO: Get proper userID likely from props.
    var messageEntry = {
      sender: 10002,
      message: message
    };

    console.log(JSON.stringify(messageEntry));
    messageHistory.push(messageEntry);
    // TODO: Hook up with database.
    this.setState({messages: messageHistory, typedMessage: ""});
  },

  /*
    Update the message history when new props are received.
  */
  componentWillReceiveProps: function(nextProps) {
    this.setState({chatUserID: nextProps.chatUserID, messages: messageHistory});
  },

  /*
    If the component did update, scroll to the bottom of the chatbox.
  */
  componentDidUpdate: function() {
    console.log("did update");
    if (this.shouldScrollBottom) {
      var node = ReactDOM.findDOMNode(this.refs.messageBody);
      node.scrollTop = node.scrollHeight;
      this.shouldScrollBottom = false;
    }
  },

  /*
    Parse message data. Used with map.
  */
  parseMessages: function(element, index) {
    this.shouldScrollBottom = true;
    return (
      <Message key = {element.message + index} chatUserID = {this.state.chatUserID} senderID = {element.sender} message = {element.message} />
    );
  },

  /*
    Render the component.
  */
  render: function() {
    var panelStyle = {
      minHeight: 900,
      maxHeight: 900
    };

    var panelBodyStyle = {
      minHeight: 750,
      maxHeight: 750,
      overflow: "auto"
    };

    var panelFooterStyle = {
      minHeight: 50,
      maxHeight: 50
    };

    // TODO: Link with database.
    return (
      <div className = "panel panel-primary" style = {panelStyle}>
        <div className = "panel panel-heading" >
          Talking to...(EMAIL) {this.state.chatUserID}
        </div>

        {/* Message Body */}
        <div className = "panel panel-body" style = {panelBodyStyle} ref = "messageBody">
          {this.state.messages === null ? null : this.state.messages.map(this.parseMessages)}
        </div>

        {/* User Response */}
        <div className = "panel panel-footer" style = {panelFooterStyle}>
          <form onSubmit = {this.handleSubmit}>
            <div className = "input-group">
              {/* Input box */}
              <input type = "text" className = "form-control" placeholder="Type a message" value = {this.state.typedMessage} onChange = {this.handleInputChange} />

              {/* Send button */}
              {/* TODO: Add onClick handler */}
              <span className = "input-group-btn">
                <button className = "btn btn-default" type = "submit" onClick = {this.handleSubmit}>
                  <span className = "glyphicon glyphicon-send"></span>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Chat;
