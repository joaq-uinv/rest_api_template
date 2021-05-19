const dotenv = require("dotenv");
const envFound = dotenv.config();

!envFound && new Error("The .env file could not be found.");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: process.env.PORT,
  api: { prefix: "/api/v1" }, //prefix route of every endpoint
  logLevel: process.env.LOG_LEVEL,
  swagger: { path: "/docs" }, //documentation route
  databaseURL: process.env.DATABASE_URL,
  authentication: {
    secret: process.env.AUTH_SECRET, //secret key
    ttl: process.env.AUTH_TTL, //time to leave i.e how much time before the session expires
  },
};
