var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();
var expressWs = require('express-ws')(app);

CLIENTS = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.use('/', routes);
app.use('/admin', require('./routes/admin'));

var router = express.Router();
router.ws('/echo', function(ws, req) {
	ws.on('close', function(msg) {
		console.log('Byee: ', msg);
	});
	ws.on('message', function(msg) {
		let data = JSON.parse(msg);
		console.log('Recieved: ', data);
		console.log('Battery: ', data.battery);
		ws.send(msg);
		data.ws = ws;
		CLIENTS[data.id] = data;
		console.log(CLIENTS);
	});
});

app.use("/ws-stuff", router);

app.listen(8080);
