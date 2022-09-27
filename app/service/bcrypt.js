const bcrypt = require('bcrypt');

async function encrypt (password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

module.exports = encrypt;