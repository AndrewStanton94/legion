window.addEventListener('load', () => {
	fetch('admin/clients')
		.then(x => x.json())
		.then(x => {
			console.log(x);
			return x;
		})
		.then(x => x.forEach(x => {
			console.log(x);
		}));
});
