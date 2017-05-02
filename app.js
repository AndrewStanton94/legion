const
	port = 8080,
	express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

server.listen(port);
console.log(`Listening on ${port}`);

app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin')(io));

io.on('connection', function (socket) {
	console.log('Connection made');
	socket.emit('interrogate', { hello: 'world' });
	socket.on('answer', data => {
		console.log('workerDescription', data);
		socket.workerDescription = data;
	});
});
