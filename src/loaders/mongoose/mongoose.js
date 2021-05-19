const mongoose = require("mongoose");
const config = require("../../config/config");

const connectToDB = async () => {
  try {
    await mongoose.connect(config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectToDB };
