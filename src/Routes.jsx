var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var CreateHistory = require("history").createHashHistory;
var useRouterHistory = ReactRouter.useRouterHistory;
var UserActions = require("./reflux/userActions.jsx");

var Base = require("./components/Base.jsx");
var HomePage = require("./components/HomePage.jsx");
var Page1 = require("./components/Page1.jsx");
var CreateAccountForm = require("./components/CreateAccountForm.jsx");
var UserProfile = require("./components/UserProfilePage.jsx");
var GamePage = require("./components/GamePage.jsx");
var PageNotFound = require("./components/PageNotFound.jsx");
var SearchResultsPage = require("./components/SearchResultsPage.jsx");
var MatchPage = require("./components/MatchPage.jsx");
var InboxPage = require("./components/InboxPage.jsx");
var SettingsPage = require("./components/SettingsPage.jsx");
var PreferencePage = require("./components/PreferencePage.jsx");
var LibraryPage = require("./components/LibraryPage.jsx");

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
      <Route path = "/search/:searchQuery" component = {SearchResultsPage}></Route>
      <Route path = "/match/:matchID" component = {MatchPage}></Route>
      <Route path = "/inbox/:inboxID" component = {InboxPage}></Route>
      <Route path = "/settings/:settingID" component = {SettingsPage}></Route>
      <Route path = "/preference/:preferenceID" component = {PreferencePage}></Route>
      <Route path = "/library/:libraryID" component = {LibraryPage}></Route>
      <Route path = "*" component = {PageNotFound}></Route>
    </Route>
  </Router>
);

module.exports = Routes;
