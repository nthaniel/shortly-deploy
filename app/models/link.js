var mongoose = require('../config').mongoose;
var urlSchema = require('../config').urlSchema;
var crypto = require('crypto');


urlSchema.methods.initialize = function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  this.save();
};

var Link = mongoose.model('Link', urlSchema);

module.exports = Link;
