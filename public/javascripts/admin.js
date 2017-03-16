window.addEventListener('load', () => {
	fetch('admin/clients')
		.then(x => x.json())
		.then(x => x.forEach(x => {
			console.log(x);
		}));
});
