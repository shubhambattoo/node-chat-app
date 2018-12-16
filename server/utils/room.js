class Room {
  constructor() {
    this.rooms = [];
  }

  addRoom (name) {
    const room = this.getRoom(name);
    if (room) return false;
    this.rooms.push(name);
    return room;
  }

  getRoom (name) {
    const room = this.rooms.filter(room => room === name);
    return room[0];
  }

  getRoomList () {
    return this.rooms;
  }
}

module.exports = {Room}