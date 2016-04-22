# Join Project 

Authors David Lam, Kennan French, and Christopher Knight

# Description:
A repository for our CSSE 333 project. The goal of this project is to create a working prototype demonstration of a Tinder for Gamers. Not in the dating sense but as a social network for gamers to connect with other gamers with similar interest.

# Requirements:
  - Node.js
  - http-server
  - Putty

# How to use:
1. Download the repository.
2. Navigate to the root of the repository folder via terminal.
3. Run `npm install` to update/retrieve required npm packages.
4. Run `npm install http-server --g` to install required test package.
5. Run `npm start` to build main.js. This will build the main.js upon any detected changes.
6. Run `http-server -p <port>` to start the server.
7. Open Putty.
8. Go to `Connection -> SSH -> Tunnels`.
9. Set port to `3306` and destination to `localhost`.
10. Go back to `Session` and enter the hostname given in the email.
11. Optional: Save Session with a session name below.
12. Click open and login with emailed credentials.
13. Now open a new terminal window and navigate to the repository.
14. Optional: Run `npm install nodemon -g` to install nodemon.
15. Run `nodemon server.js` or `node server.js` and run on port `3333`
16. Open your prefered browser and go to `localhost:<port>`.
17. You should now see the generated HTML.

# Milestones:
## Milestone 01:
### David Lam:
- [x] Create login page
- [x] Account creation page
- [x] Set up nav bar

### Kennan French:
- [x] Create preference selection form
- [x] Create message/chat UI
- [x] Design profile page

### Christopher Knight
- [x] Create scripts
- [x] Tutorials for javascript, node, mysql
