var NavItemMixIn = {
  getInitialState: function() {
    return ({hover: false});
  },

  mouseOver: function() {
    this.setState({hover: true});
  },

  mouseOut: function() {
    this.setState({hover: false});
  }
};

module.exports = NavItemMixIn;
