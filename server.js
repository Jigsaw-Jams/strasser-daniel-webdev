var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// require("./utilities/filelist");

app.use(express.static(__dirname + '/public'));

require("./assignment_serverside/app");
//require("./test/app");

// Use heroku PORT if it is present in the environment.
var port = process.env.PORT || 3000;
app.listen(port);