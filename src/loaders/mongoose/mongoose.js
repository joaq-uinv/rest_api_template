const mongoose = require("mongoose");
const config = require("../../config/config");

const connectToDB = async () => {
  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

module.exports = { connectToDB };
