var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var CreateHistory = require("history").createHashHistory;
var useRouterHistory = ReactRouter.useRouterHistory;

var Base = require("./components/Base.jsx");
var HomePage = require("./components/HomePage.jsx");
var Page1 = require("./components/Page1.jsx");
var CreateAccountForm = require("./components/CreateAccountForm.jsx");
var UserProfile = require("./components/UserProfilePage.jsx");
var GamePage = require("./components/GamePage.jsx");

var History = useRouterHistory(CreateHistory)({
  queryKey: false
});

var Routes = (
  <Router history = {History}>
    <Route path = "/" component = {Base}>
      <IndexRoute component = {HomePage}></IndexRoute>
      <Route path = "/home" component = {HomePage}></Route>
      <Route path = "/create" component = {CreateAccountForm}></Route>
      <Route path = "/testpage" component = {Page1}></Route>
      <Route path = "/profile/:userID" component = {UserProfile}></Route>
      <Route path = "/game/:gameID" component = {GamePage}></Route>
    </Route>
  </Router>
);

module.exports = Routes;
