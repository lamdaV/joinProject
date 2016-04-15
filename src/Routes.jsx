var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var CreateHistory = require("history").createHashHistory;
var useRouterHistory = ReactRouter.useRouterHistory;

var Base = require("./components/Base.jsx");
var HomePage = require("./components/HomePage.jsx");

var History = useRouterHistory(CreateHistory)({
  queryKey: false
});

var Routes = (
  <Router history = {History}>
    <Route path = "/" component = {Base}>
      <Route path = "/home" component = {HomePage}></Route>
    </Route>
  </Router>
);

module.exports = Routes;
