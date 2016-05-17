var React = require("react");
var ReactDOM = require("react-dom");
var Reflux = require("reflux");
var MessageStore = require("../reflux/messageStore.jsx");
var MessageActions = require("../reflux/messageActions.jsx");
var Message = require("./Message.jsx");

var Chat = React.createClass({
  /*
    Listen to the MessageStore.
  */
  mixins: [Reflux.listenTo(MessageStore, "setMessageHistory")],

  /*
    Define propTypes.
  */
  propTypes: {
    inboxID: React.PropTypes.string,
    chatUserID: React.PropTypes.number,
    chatUserEmail: React.PropTypes.string
  },

  /*
    Set initial state values.
  */
  getInitialState: function() {
    return ({inboxID: this.props.inboxID, chatUserID: this.props.chatUserID, messages: null, typedMessage: ""});
  },

  setMessageHistory: function(event, data) {
    console.log("setMessageHistory data: " + JSON.stringify(data.messages));
    this.setState({messages: data.messages});
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

    MessageActions.postMessagePush(this.state.inboxID, this.state.chatUserID, this.state.typedMessage);

    this.setState({typedMessage: ""});
  },

  /*
    Update the message history when new props are received.
  */
  componentWillReceiveProps: function(nextProps) {
    if (this.state.chatUserID === nextProps.chatUserID) {
      console.log("already in chatroom with user: " + this.state.chatUserID);
      return;
    }
    MessageActions.postMessageHistory(this.state.inboxID, nextProps.chatUserID);
    this.setState({chatUserID: nextProps.chatUserID, chatUserEmail: nextProps.chatUserEmail});
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
      <Message key = {element.TimeStamp + index} timeStamp = {element.TimeStamp} inboxID = {this.state.inboxID} senderID = {element.sender} senderEmail = {element.Email} message = {element.Contents} />
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

    return (
      <div className = "panel panel-primary" style = {panelStyle}>
        <div className = "panel panel-heading" >
          Joining with {this.state.chatUserEmail}
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
