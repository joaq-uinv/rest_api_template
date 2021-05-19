const initialize = require("./loaders/index");

const initServer = () => {
  initialize.initExpressServer();
};

initServer();
