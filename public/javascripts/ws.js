	console.log('Loaded');
	// Create WebSocket connection.
	const socket = new WebSocket('ws://localhost:8080/ws-stuff/echo');

	// Connection opened
	socket.addEventListener('open', function (event) {
		socket.send('Hello Server!');
		navigator.getBattery().then(battery => {
			console.log(battery);

			let workerDescription = {
				cores: navigator.hardwareConcurrency,
				battery
			}
			console.log(workerDescription);
			socket.send(JSON.stringify(workerDescription));
		});
	});

	// Listen for messages
	socket.addEventListener('message', function (event) {
		console.log('Message from server', event.data);
	});
