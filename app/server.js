const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const cors = require('cors');

const config = require('config').server;

const {printIp, handleAsyncExceptions} = require('app/util');
const groute = require('./gRoute');

function run() {
  const app = express();

  app.set('root', `${__dirname}/..`);

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: true}));
  // parse application/json
  app.use(bodyParser.json({limit: '50mb'}));
  // enable cors
  app.use(cors());

  // handle errors and send them back to browser
  app.use(errorhandler());

  // set the base uri
  app.set('baseUrl', config.baseUrl);

  // mount the routes
  app.use(groute);

  // mount server
  app.listen(config.port, config.host, () => {
    console.log(`app running on http://${config.host}:${config.port}`);
    printIp();
  });
}

module.exports = run;

if (require.main === module) {
  handleAsyncExceptions();
  run();
}