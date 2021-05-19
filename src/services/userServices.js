//in this layer the business logic takes place
const UserRepository = require("../repositories/UserRepositroy");

class UserServices {
  constructor() {
    this.repo = new UserRepository();
  }

  getAll = async () => await this.repo.findAll();

  getByID = async (id) => await this.repo.findByID(id);

  getByEmail = async (email) => await this.repo.findByEmail(email);

  create = async (user) => await this.repo.save(user);

  edit = async (id, user) => await this.repo.update(id, user);

  delete = async (id) => await this.repo.remove(id);
}

module.exports = UserServices;
