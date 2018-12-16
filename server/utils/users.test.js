const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '768',
        name: 'Dre',
        room: 'hiphop'
      },
      {
        id: '123',
        name: 'Cole',
        room: 'hiphop'
      },
      {
        id: '459',
        name: 'rahman',
        room: 'melody'
      },
    ]
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Snoop dogg',
      room: 'Death Row Records'
    };

    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user])
  });

  it('should remove a user', () => {
    const userId = '768'

    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const userId = '99'

    const user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    const user = users.getUser('459');
    expect(user).toEqual({
      id: '459',
      name: 'rahman',
      room: 'melody'
    })
  });

  it('should not find a user', () => {
    const user = users.getUser('222');
    expect(user).toNotExist();
  });

  it('should return names for hiphop', () => {
    const userList = users.getUserList('hiphop');

    expect(userList).toEqual(['Dre', 'Cole'])
  });

  it('should return names for melody', () => {
    const userList = users.getUserList('melody');

    expect(userList).toEqual(['rahman'])
  });
})