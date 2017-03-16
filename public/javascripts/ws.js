window.addEventListener('load', () => {
	console.log('Loaded');
	// Create WebSocket connection.
	const socket = new WebSocket(`ws://${location.host}/ws-stuff/echo`);

	// Connection opened
	socket.addEventListener('open', function (event) {
		navigator.getBattery().then(battery => {
			console.log(battery);

			let workerDescription = {
				cores: navigator.hardwareConcurrency,
				battery: {
					charging: battery.charging,
					level: battery.level,
					chargingTime: battery.chargingTime,
					dischargingTime: battery.dischargingTime
				},
				id: Math.floor(Math.random() * 1000)
			};
			console.log(workerDescription);
			socket.send(JSON.stringify(workerDescription));
		});
	});

	// Listen for messages
	socket.addEventListener('message', function (event) {
		console.log('Message from server', event.data);
	});
});
