const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const ROLES = require("../constants/constants");

//the schema defines the structure of the doc i.e the user that will be persisted to the db i.e what attrs each user will have, besides the data type of every attr
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name required."],
    },
    email: {
      type: String,
      required: [true, "Email required."],
      //avoid that more than one user with a certain email can be created
      unique: true,
      index: true,
    },
    birthDate: Date,
    password: {
      type: String,
      required: [true, "Password required."],
    },
    role: {
      type: String,
      required: true,
      default: ROLES.USER_ROLE,
      enum: [ROLES.USER_ROLE, ROLES.ADMIN_ROLE],
    },
    enable: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

//use mongoose validator
userSchema.plugin(uniqueValidator, { message: "already exists in the DB." });
//add pagination
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("users", userSchema); //the first param is the name of the collection in the db and the second, the schema that collection will asign to every doc persisted
