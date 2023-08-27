const background = (tipo) => {
	let background;

	switch (tipo) {
		case 'grass':
			background = 'rgba(0, 255, 0, 0.452)';
			return background;

		case 'fire':
			background = 'rgba(255, 78, 0, 0.452)';
			return background;

		case 'water':
			background = 'rgba(99, 138, 225, 0.452)';
			return background;

		case 'bug':
			background = 'rgba(0, 78, 0, 0.452)';
			return background;

		case 'normal':
			background = 'rgba(150, 153, 125, 0.452)';
			return background;

		case 'poison':
			background = 'rgba(152, 0, 255, 0.452)';
			return background;

		case 'electric':
			background = 'rgba(255, 255, 0, 0.452)';
			return background;

		case 'ground':
			background = 'rgba(200, 173, 110, 0.452)';
			return background;

		case 'fairy':
			background = 'rgba(255, 0, 255, 0.452)';
			return background;

		case 'psychic':
			background = 'rgba(255, 71, 47, 0.452)';
			return background;

		case 'fighting':
			background = 'rgba(255, 0, 0, 0.452)';
			return background;

		case 'rock':
			background = 'rgba(49, 29, 0, 0.452)';
			return background;

		case 'ghost':
			background = 'rgba(29, 0, 123, 0.452)';
			return background;

		case 'ice':
			background = 'rgba(0, 207, 202, 0.452)';
			return background;

		case 'dragon':
			background = 'rgba(30, 0, 255, 0.452)';
			return background;

		default:
			background = 'black';
			return background;
	}
};

export default background;
