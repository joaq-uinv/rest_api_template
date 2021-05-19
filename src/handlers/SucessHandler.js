//to be logged when a response is successfull
class Success {
  constructor(data) {
    this.status = "Ok";
    this.data = data;
  }
}

module.exports = Success;
