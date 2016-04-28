var NavItemMixIn = {
  getInitialState: function() {
    return ({hover: false});
  },

  mouseOver: function(event) {
    this.setState({hover: true});
  },

  mouseOut: function(event) {
    this.setState({hover: false});
  }
};

module.exports = NavItemMixIn;
