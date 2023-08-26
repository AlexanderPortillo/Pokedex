const background = (tipo) => {
	let background;

	switch (tipo) {
		case 'grass':
			background = 'rgba(0, 128, 0, 0.452)';
			return background;
		case 'fire':
			background = 'rgba(0, 128, 0, 0.452)';
			return background;
		default:
			background = 'transparent';
			return background;
	}
};

export default background;
