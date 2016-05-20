[![forthebadge](http://forthebadge.com/images/badges/compatibility-club-penguin.svg)](http://forthebadge.com)
# Join Project [![Build Status](https://travis-ci.org/lamdaV/joinProject.svg?branch=master)](https://travis-ci.org/lamdaV/joinProject) [![Dependency Status](https://david-dm.org/lamdav/joinProject.svg)](https://david-dm.org/lamdav/joinProject)

Authors: David Lam, Kennan French, and Christopher Knight

# Description:
A repository for our CSSE 333 project. The goal of this project is to create a working prototype demonstration of a Tinder for Gamers. Not in the dating sense but as a social network for gamers to connect with other gamers with similar interest.

# Requirements:
  - Node.js
  - http-server
  - Putty or SSH client

# How to use (Local):
1. Download the repository.
2. Navigate to the root of the repository folder via terminal.
3. Run `npm install` to update/retrieve required npm packages.
4. Run `npm install http-server --g` to install required test package.
5. Run `npm start` to build main.js located in `public\js`. This will build the main.js upon any detected changes. Note: the terminal will be inactive.
6. Run `http-server -p <port>` to start the server.
  - Alternative: Rather than using `http-server`, you can launch `node app.js` or `nodemon app.js` instead. Everything else still follows.
7. Open Putty or SSH client.
8. Go to `Connection -> SSH -> Tunnels`.
9. Set port to `3306` and destination to `localhost:3306`. Then click the add button.
10. Go back to `Session` and enter the hostname given in the email.
11. Optional: Save Session with a session name below.
12. Click open and login with emailed credentials.
13. Now open a new terminal window and navigate to the repository.
14. Optional: Run `npm install nodemon -g` to install nodemon.
15. Run `nodemon server.js` or `node server.js`. This will run a server on port `3333`.
16. Open your prefered browser and go to `localhost:<port>` where `<port>` is the port used in `http-server`.
17. You should now see the react webpage.

# How to use (Remote):
1. SSH into the provided VM (see steps above).
2. Enter into the terminal `cd joinProject/`.
3. Recommended: enter into the terminal `git pull origin master`.
4. Run the shell script by entering this into the terminal `./run.sh`.
5. You can now access the server remotely by going to `joincsse333.csse.rose-hulman.edu:3330` (only when on campus).
6. Note: The servers (web and API server) will now run indefinitely. To shut down the servers, run `forever stopall`.

# List of Pages:
|         Page          |    Assigned                       |    Status     |
|:---------------------:|:---------------------------------:|:-------------:|
| User Profile          | Kennan French                     | Incomplete    |
| User Account Setting  | Kennan French                     | Incomplete    |
| Game Info             | David Lam                         | Completed     |
| Search Result         | David Lam                         | Completed     |
| Preference Selection  | Kennan French                     | Incomplete    |
| Matching              | David Lam                         | Completed     |
| Conversation          | ~~Kennan French~~ <br/> David Lam | Completed     |

# Milestones:
## Milestone 01:
### David Lam:
- [x] Create login page
- [x] Account creation page
- [x] Set up nav bar

#### Extras:
- [x] Email Validation
- [x] Password Validation
- [x] Account Validation
- [x] Basic Routing
- [x] Set up Express Server

### Kennan French:
- [x] Create preference selection form
- [x] Create message/chat UI
- [x] Design profile page

### Christopher Knight:
- [x] Create scripts
- [x] Tutorials for javascript, node, mysql

## Milestone 02:
### David Lam:
  - [x] Connect account creation page to backend
  - [x] Start games page
  - [x] Peer review stored procedures

#### Extras:
  - [x] Have users retype password for front end validation
  - [x] Token-based authentication
  - [x] Begin implementing stored procedures
  - [x] Sign out procedures
  - [x] Modified Create stored procedure
  - [x] Modified Login stored procedure
  - [x] Made GetGameByTitle stored procedure
  - [x] Start Game searching

### Kennan French:
  - [x] Learn React
  - [ ] Hook stuff up with David's stuff (related to above)
  - [x] Write js to do the stuff I said js would do on previous pages
  - [ ] Unify/standardize css, custom div classes
  - [x] At least registration front-end validation (David Lam)
  - [x] Create dummy user for VM (David Lam)

### Christopher Knight:
  - [x] Stored procedures for user creation + account info updates
  - [x] Stored procedures for creating + updating available hours
  - [x] Stored procedures for user rating
  - [x] Help get mysql talk to front end
  - [x] Figure out dummy user permissions

## Milestone 03:
### David Lam:
  - [x] Matching page
  - [x] Add tags to game page

### Extras:
  - [x] Complete Game searching
  - [x] Made games page database dependent
  - [x] Added more security checks on authentication-required pages
  - [x] Set up pages for User Profile, Preference, and Messages
  - [x] Added ESLint
  - [x] Added Travis CI integration
  - [x] Reduced Coupling in handling token authentication
  - [x] Cleaned code running linter

### Kennan French:
  - [x] Make schedule widget
  - [ ] Make rest of widgets needed for user profile page
  - [ ] Profile page should be done
  - [x] More integration
  - [ ] User preferences/settings page

### Christopher Knight:
  - [x] Continue writing stored procedures as needed
  - [x] Figure out mysql data dump
  - [x] Add lots of data to tables

## Milestone 04:
### David Lam
  - [x] Begin integrating matching page front end with back end (dependent on Chris)

### Extras:
  - [x] Improved Linter with React
  - [x] Commented Existing Code
  - [x] Get basic Chat components
  - [x] Completed Chat components
  - [x] Match page accept/reject now functional
  - [x] Users can add games to their "library" from the Game Page
  - [x] Users can now view their library
  - [x] Users can now delete games from their library
  - [x] SQL Stored Procedures written:
      - get_game_by_id
      - add_message
      - add_friend
      - get_message_history
      - is_game_in_library
      - get_user_library
      - delete_game_from_library

### Kennan French
  - [x] Scroll box (class? widget?) (David Lam)
  - [ ] Integrate widgets with React virtualization + fix other React "quirks"
  - [ ] User preferences/settings page (done, just fighting with git to publish)

### Christopher Knight
  - [x] Match page back end/implement matching algorithm

### Group
  - [x] Study for test
  - [x] Heuristics discussion  

## Milestone 05:
### David Lam
  - [x] Remove friend frontend
  - [x] Work on paper

### Extras:
  - [x] Updated SQL Stored Procedures:
    - get_friends_list (Now returns alphabetically)
  - [x] Wrote SQL Stored Procedures:
    - delete_friend (Chris was asleep when writing UI)
  - [x] Added dependencies badge.
  - [x] Addded bash shell script for starting servers.
  - [x] Integrated changes introduced by multi-valued Platform changes.
  - [x] Setup GitHub Pages.
  - [x] Fixed Preference Page bugs introduced by Kennan
  - [x] Updated some pages to meet React Router changes.
  - [x] User's can now have empty friends list.

### Christopher Knight
  - [x] Remove friend backend (David Lam)
  - [x] Work on paper
  - [x] Add index to tables

### Extras:
  - [x] Get multi-valued property of Platform working

### Kennan French
  - [ ] Integrate widgets with React virtualization + fix other React "quirks"
  - [ ] User preferences/settings page (done, just fighting with git to publish)
  - [ ] Work on paper
  - [ ] Integrate Profile page
  - [ ] User Rate other Users
  - [x] Compatibility with Mozilla Firefox
  - [ ] Hash Passwords
