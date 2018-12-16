class Users {
  constructor() {
    this.users = [];
  }

  addUser (id, name, room) {
    const user = {id, name, room};
    const cUser = this.getUserWName(user.name);
    if (cUser) {
      if (cUser.room === user.room) {
        return false;
      }
    }
    this.users.push(user);
    return user;
  }
   
  removeUser (id) {
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id)
    }

    // if (users.length === 0) {return this.users};
    // const indexOfUser = this.users.indexOf(users[0]);
    // this.users.splice(indexOfUser, 1);
    return user;
  }

  getUser (id) {
    const users = this.users.filter(user => user.id === id);
    return users[0];
  }

  getUserWName (name) {
    const users = this.users.filter(user => user.name === name);
    return users[0];
  }

  getUserList (room) {
    const users = this.users.filter(user => user.room === room);
    const names = users.map((user) => user.name);
    return names;
  }
}

module.exports = {Users}