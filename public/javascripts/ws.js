window.addEventListener('load', () => {
	const socket = io(`${location.host}`);
	document.socket = socket;
	socket.on('interrogate', data => {
		console.log(data);

		navigator.getBattery().then(battery => {
			console.log(battery);
			let workerDescription = {
				cores: navigator.hardwareConcurrency,
				battery: {
					charging: battery.charging,
					level: battery.level,
					chargingTime: battery.chargingTime,
					dischargingTime: battery.dischargingTime
				}
			};
			console.log(workerDescription);
			socket.emit('answer', workerDescription);
		});
	});
});
