'use strict';

const Hapi = require('hapi');  
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({  
  port: 3000
});

//Connect to db
server.app.db = mongojs('punit');

//Load plugins and start server
/*
server.register([
  require('./routes/books')
], (err1) => {

  if (err1) {
    throw err1;
  }

  // Start the server
  server.start((err1) => {
    console.log('Server running at:', server.info.uri);
  });

});
*/

var listOfRoutes = [require('./routes/sendEmail')];

function mainHandler(err1) {

  if (err1) {
    throw err1;
  }

  // Start the server
  server.start((err1) => {
    console.log('Server running at:', server.info.uri);
  });
}

server.register(listOfRoutes, mainHandler);