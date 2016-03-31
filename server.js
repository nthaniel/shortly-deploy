var app = require('./server-config.js');

var port = process.env.PORT;

app.listen(port || 4568);

console.log('Server now listening on port ' + (port || 4568));
