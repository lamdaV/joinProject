var NavItemMixIn = {
  /*
    Set initial state values.
  */
  getInitialState: function() {
    return ({hover: false});
  },

  /*
    Handle component mouse is over.
  */
  mouseOver: function() {
    this.setState({hover: true});
  },

  /*
    Handle component mouse is out.
  */
  mouseOut: function() {
    this.setState({hover: false});
  }
};

module.exports = NavItemMixIn;
