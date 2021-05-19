//the repo layer is the one that communicates with the db i.e the model layer
const bcrypt = require("bcrypt");
const User = require("../models/users");

class UserRepository {
  constructor() {}

  async findAll() {
    return await User.find();
  }

  async findAllWithPagination(filter, options) {
    return await User.paginate(filter, options);
  }

  async findByID(id) {
    return await User.findById(id);
  }

  async findByEmail(email) {
    return await User.findOne({ email: email });
  }

  async save(user) {
    //encrypt pass
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  }

  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id) {
    return await User.findByIdAndRemove(id);
  }
}

module.exports = UserRepository;
