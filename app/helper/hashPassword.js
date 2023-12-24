const bcrypt = require('bcrypt')

exports.hashPassword = (password, data) => {
    bcrypt.genSalt(16, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hashPassword) {
            data
        });
    });
}