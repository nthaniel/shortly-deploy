var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

var urlSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});


var userSchema = mongoose.Schema({
  username: String,
  password: String
});

module.exports.urlSchema = urlSchema;
module.exports.userSchema = userSchema;

  // var User = mongoose.model('User', userSchema);

  // var bob = new User({username: 'bob'});
  // bob.save(function (err) {
  //   if (err) {
  //     console.error('error creating bob', err);
  //   } else {
  //     console.log('created bob');
  //   }
  // });

  // User.find().exec(function(err, user) {
  //   console.log(user);
  // });


module.exports.db = db;
module.exports.mongoose = mongoose;
