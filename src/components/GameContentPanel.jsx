var React = require("react");
var Reflux = require("reflux");
var UserActions = require("../reflux/userActions.jsx");
var GameActions = require("../reflux/gameActions.jsx");
var GameStore = require("../reflux/gameStore.jsx");

var GameContentPanel = React.createClass({
  mixins: [Reflux.listenTo(GameStore, "setButtonState")],
  /*
    Define propTypes.
  */
  propTypes: {
    headerColor: React.PropTypes.string,
    gameID: React.PropTypes.string.isRequired,
    gameTag: React.PropTypes.array,
    gamePlatform: React.PropTypes.array,
    isLoggedIn: React.PropTypes.bool.isRequired,
    userID: React.PropTypes.string.isRequired
  },

  /*
    Set intial state values.
  */
  getInitialState: function() {
    return ({title: "", rating: "", price: "", tags: null, platform: null, isLoggedIn: this.props.isLoggedIn, buttonEnabled: false});
  },

  /*
    Add game to the user's library.
  */
  addToLibrary: function(event) {
    event.preventDefault();
    if (this.state.buttonEnabled) {
      console.log("adding to library...");
      UserActions.postAddToLibrary(this.props.userID, this.props.gameID);
      this.setState({buttonEnabled: false});
    } else {
      console.log("game already in library");
    }
  },

  /*
    Changes the button's state based on db data.
  */
  setButtonState: function(event, gameData) {
    console.log("in setButtonState");
    if (gameData.isInLibrary && gameData.isInLibrary.isInLibrary === 0) {
      console.log("setButtonState: " + JSON.stringify(gameData.isInLibrary.isInLibrary));
      this.setState({buttonEnabled: true});
    }
  },

  /*
    Set corresponding state values when props are received.
  */
  componentWillReceiveProps: function(nextProps) {
    console.log("GameContentPanel receiving props...");
    console.log("props data: " + JSON.stringify(nextProps.gameData));
    console.log("props tag: " + JSON.stringify(nextProps.gameTag));
    console.log("props platform: " + JSON.stringify(nextProps.gamePlatform));

    if (nextProps.gameData) {
      this.setState({title: nextProps.gameData.Title, rating: nextProps.gameData.Rating, price: nextProps.gameData.Price});
    }

    if (nextProps.gameTag) {
      this.setState({tags: nextProps.gameTag});
    }

    if (nextProps.gamePlatform) {
      this.setState({platform: nextProps.gamePlatform});
    }

    if (nextProps.isLoggedIn) {
      this.setState({isLoggedIn: nextProps.isLoggedIn});
    }

    if (this.props.userID !== nextProps.userID) {
      console.log("firing postIsInLibrary event");
      GameActions.postIsInLibrary(nextProps.userID, this.props.gameID);
    }
  },

  /*
    Render the component.
  */
  render: function() {
    var divStyle = {
      marginTop: 10
    };

    var detailPanelStyle = {
      minHeight: 240
    };

    var pricePanelStyle = {
      minHeight: 240
    };

    var priceFontStyle = {
      marginTop: 80,
      color: "white",
      fontStyle: "Calibri",
      fontSize: 36
    };

    var buttonClassName = "btn btn-primary disabled";
    if (this.state.buttonEnabled) {
      buttonClassName = "btn btn-primary active";
    }

    var panelHeaderStyle = {};

    if (this.props.headerColor) {
      panelHeaderStyle.background = this.props.headerColor;
      pricePanelStyle.background = this.props.headerColor;
    }

    // Function to create a TagLabel. Used in conjuction with map.
    var createTagLabel = function(item, index) {
      return (
        <span className = "label label-info" key = {item.TagName + index}> {item.TagName} </span>
      );
    };

    // Function to create a PlatformLabel. Used in conjuction with map.
    var createPlatformLabel = function(item, index) {
      return (
        <span className = "label label-info" key = {item.plat_name + index}> {item.plat_name} </span>
      );
    };

    var buttonStyle = {
      background: "#527F76",
      minHeight: 75
    };

    return (
      <div style = {divStyle}>
        <div className = "col-xs-9 col-sm-9">
          <div style = {detailPanelStyle} className = "panel panel-primary">
            <div style = {panelHeaderStyle} className = "panel-heading">
              {/* Game title */}
              <div className = "row">
                <h1 className = "col-sm-6 text-left">
                  {this.state.title}
                </h1>

                {/* Add to Library */}
                {this.state.isLoggedIn ? <div className = "col-sm-6 text-right">
                  <button className = {buttonClassName} style = {buttonStyle} onClick = {this.addToLibrary}> Add to Library </button>
                </div> : null}

              </div>
            </div>

            {/* Game Details should go here */}
            <div className = "panel-body">
              <h3> Platforms: </h3>
              {this.state.platform ? this.state.platform.map(createPlatformLabel) : null}
              <h3> Rating: {this.state.rating} </h3>
              <h3> Tags: </h3>
              {this.state.tags ? this.state.tags.map(createTagLabel) : null}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className = "col-xs-3 col-sm-3">
          <div className = "panel panel-default">
            <div style = {pricePanelStyle} className = "panel-heading">
              <div style = {priceFontStyle} className = "row text-center">
                ${this.state.price}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GameContentPanel;
