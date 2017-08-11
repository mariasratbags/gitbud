//-- two scripts that heroku needs --//
//npm run postinstall
//postinstall - ran immediately after install NPM modules
//intended to build our project (take all of our development code and run webpack to produce single javascript file that will use for application) this is where we build out bundle.js
//the script is needed and will be run automatically after installing on all of the NPM modules and its executed exactly once.
//It is the ideal spot for us to tell webpack to build our application for deployment

//npm run start
//heroku will execute this next step after postInstall
//start - responsible for starting and maintaining the server
