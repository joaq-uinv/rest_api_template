const mongoose = require("mongoose");
const config = require("../../config/config");
const logger = require("../logger/logger");

const connectToDB = async () => {
  try {
    await mongoose.connect(config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (err) {
    logger.error(err);
  }
};

module.exports = { connectToDB };
