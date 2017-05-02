module.exports = function (io) {
	let express = require('express'),
		router = express.Router();

	router.get('/', function(req, res, next) {
	  res.render('admin', { title: 'Legatus' });
	});

	router.get('/clients', function(req, res, next) {
		let socketNames = Object.keys(io.sockets.sockets);
		console.log('clients ', socketNames);
		socketNames.forEach(socket => {
			console.log(io.sockets.sockets[socket].workerDescription);
		});
		res.json(socketNames);
	});

	return router;
};
