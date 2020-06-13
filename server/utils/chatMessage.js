function formatMessage (username, text) {
    return {
      username,
      text,
      date: Date.now()
    };
  }
  
module.exports = { formatMessage };