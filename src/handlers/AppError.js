//to be logged when an internal error occurs
class AppError extends Error {
  constructor(message, code = 500, data) {
    //pass error message to the in-built Error object
    super(message);
    this.code = code;
    this.data = data;
  }
}

module.exports = AppError;
