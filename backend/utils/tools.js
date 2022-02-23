const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

exports.hash = (myPlaintextPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          reject(err)
        }
        resolve(hash)
      });
    })
  })
}

exports.compare = (myPlaintextPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      if (err) {
        reject(err)
      }
      resolve(result)
    });
  })
}

exports.sign = (username) => {
  const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'));
  const token = jwt.sign({ username }, privateKey, { algorithm: 'RS256' });
  return token
};

exports.verify = (token) => {
  const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'));
  const result = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  return result
}