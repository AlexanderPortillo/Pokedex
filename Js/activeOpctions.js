// !Creacion de constantes para el llamado de clases de la pokedex
const navbar = document.querySelector('.nav');
const search = document.querySelector('.header__search');
const itemOne = document.querySelector('.nav__li--one');
const itemTwo = document.querySelector('.nav__li--two');
const boxes = document.querySelector('.boxes');
const header = document.querySelector('.header__search--pokemon');
const mobile = document.querySelector('.mobile');

const data = document.querySelector('.data__container--btn');
const abilities = document.querySelector('.data__abilities');
const stats = document.querySelector('.data__stats');
const moves = document.querySelector('.data__moves');

const activeOpctions = () => {
		// !Activa las opciones de la pokedex
	navbar.addEventListener('click', (e) => {
		const btn = e.target.closest('button');
		const link = e.target.closest('a');

		// !Activamos el retiro del menu para movil
		if (btn?.dataset?.accion === 'menu') {
			mobile.classList.remove('mobile--disabled');
		}

		// !Activamos el buscador
		if (link?.dataset?.accion === 'home') {
			e.preventDefault();
			search.classList.add('header--active');
			itemOne.classList.add('nav__li--active');
			itemTwo.classList.remove('nav__li--active');
			boxes.classList.remove('boxes--active');
			header.classList.add('header__search--pokemon--active');
		}

		// !Activamos la pokedex
		if (link?.dataset?.accion === 'pokedex') {
			e.preventDefault();
			search.classList.remove('header--active');
			itemOne.classList.remove('nav__li--active');
			itemTwo.classList.add('nav__li--active');
			boxes.classList.add('boxes--active');
			header.classList.remove('header__search--pokemon--active');
		}
	});
};

 // !Activamos la forma movil de la pokedex
const mobileActive = () => {
	mobile.addEventListener('click', (e) => {
		const btn = e.target.closest('button');
		const link = e.target.closest('a');

		if (btn?.dataset?.accion === 'close') {
			mobile.classList.add('mobile--disabled');
		}

		// !Activamos el buscador
		if (link?.dataset?.accion === 'home') {
			e.preventDefault();
			search.classList.add('header--active');
			itemOne.classList.add('nav__li--active');
			itemTwo.classList.remove('nav__li--active');
			boxes.classList.remove('boxes--active');
			header.classList.add('header__search--pokemon--active');
			mobile.classList.add('mobile--disabled');
		}

		// !Activamos la pokedex
		if (link?.dataset?.accion === 'pokedex') {
			e.preventDefault();
			search.classList.remove('header--active');
			itemOne.classList.remove('nav__li--active');
			itemTwo.classList.add('nav__li--active');
			boxes.classList.add('boxes--active');
			header.classList.remove('header__search--pokemon--active');
			mobile.classList.add('mobile--disabled');
		}

		// !Salimos
		if (link?.dataset?.accion === 'exit') {
			search.classList.remove('header--active');
			itemOne.classList.remove('nav__li--active');
			itemTwo.classList.add('nav__li--active');
			boxes.classList.add('boxes--active');
			header.classList.remove('header__search--pokemon--active');
			mobile.classList.add('mobile--disabled');
		}
	});
};

//! Activamos la seleccion de que apartado mostrar en la tarjeta de los pokemon 
const activeData = () => {
	data.addEventListener('click', (e) => {
		const active = e.target.closest('button');

		if (active?.dataset?.accion === 'abilities') {
			e.preventDefault();
		}

		if (active?.dataset?.accion === 'stats') {
			e.preventDefault();
			abilities.classList.add('data--disabled');
		}

		if (active?.dataset?.accion === 'moves') {
			e.preventDefault();
		}
	});
};

export { activeOpctions, mobileActive, activeData };
