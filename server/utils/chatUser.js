let users = [];

// Join user to chat
function userJoin(id, user, room) {
  const chatUser = { id, user, room };
  const u = users.filter(user => user.id === id)[0];
  if (!u)
    users.push(chatUser);
  return chatUser;
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

// User leaves chat
function userLeave(id) {
  const chatUser = users.filter(user => user.id === id)[0];
  users = users.filter(user => user.id !== id);

  return chatUser;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

module.exports = {
  userJoin,
  userLeave,
  getRoomUsers,
  getCurrentUser
};
