module.exports = model => ({
  async get() {
    const users = await model.find();
    return users;
  },
  async getOneByEmail(email) {
    const user = await model.findOne({ email });
    return user;
  },
  async getOne(id) {
    const user = await model
      .findById(id);
    return user;
  },
  async create(data) {
    const user = await model.create(data);
    return user;
  },
});