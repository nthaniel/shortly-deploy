var mongoose = require('../config').mongoose;
var userSchema = require('../config').userSchema;

var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      this.save();
    });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
