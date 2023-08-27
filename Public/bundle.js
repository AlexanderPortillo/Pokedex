'use strict';

const navbar = document.querySelector('.nav');
const search = document.querySelector('.header__search');
const itemOne = document.querySelector('.nav__li--one');
const itemTwo = document.querySelector('.nav__li--two');
const boxes = document.querySelector('.boxes');
const header = document.querySelector('.header__search--pokemon');
const mobile = document.querySelector('.mobile');

const activeOpctions = () => {
	navbar.addEventListener('click', (e) => {
		const btn = e.target.closest('button');
		const link = e.target.closest('a');

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

const mobileActive = () => {
	mobile.addEventListener('click', function (e) {
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

const contenido = document.getElementById('boxes');
const datos = document.getElementById('data');

const dataPokemon = () => {
	contenido.addEventListener('click', (e) => {
		if (e.target.closest('.box')) {
			datos.classList.add('data--active');
		}
	});

	datos.addEventListener('click', (e) => {
		e.preventDefault();

		if (e.target.closest('button')) {
			datos.classList.remove('data--active');
		}
	});
};

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

function Pokemon(
	urlImagen,
	nombre,
	id,
	tipo,
	tipos,
	peso,
	altura,
	ps,
	ataque,
	defensa,
	ataqueEspecial,
	defensaEspecial,
	velocidad
) {
	return {
		urlImagen: urlImagen,
		nombre: nombre,
		id: id,
		tipo: tipo,
		tipos: tipos,
		peso: peso,
		altura: altura,
		ps: ps,
		ataque: ataque,
		defensa: defensa,
		ataqueEspecial: ataqueEspecial,
		defensaEspecial: defensaEspecial,
		velocidad: velocidad,
		obtenerDatos: function () {
			const typeSpans = this.tipos
				.map(
					(type) =>
						`<span class="box__type" style="background-color: ${background(
							this.tipo
						)};">${type}</span>`
				)
				.join('');

			const plantilla = `
                <div class="box" id="box" data-id="${this.id}">
                    <div class="box__container" style="background-color: ${background(
											this.tipo
										)};">
                        <img src="${this.urlImagen}" alt="" class="box__img">
                    </div>
                    <span class="box__name--pokemon">${this.nombre}
					<br>
					N°. ${this.id}</span>
                    <div class="box__data--pokemon">
                        <div class="box__type--pokemon">
                            ${typeSpans}
                        </div>
                        <div class="box__data" style="background-color: ${background(
													this.tipo
												)};">
                            <div class="box__weight">
                                <i class="fas fa-arrows-up-down"></i>
                                ${this.altura}m
                            </div>
                            <div class="box__height">
                                <i class="fas fa-weight-hanging"></i>
                                ${this.peso}Kg
                            </div>
                        </div>
                    </div>
                </div>`;
			return plantilla;
		},
		cargarDatos: function () {
			const data = document.querySelector('.data__content');
			data.style.background = background(this.tipo);
			let SumaTotal =
				this.ps +
				this.ataque +
				this.defensa +
				this.ataqueEspecial +
				this.defensaEspecial +
				this.velocidad;

			const plantilla = `
					<div class="data__card">
						<div class="data__container">
							<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${this.id}.gif"
								alt="" class="data__img--pokemon">
						</div>

						<div class="data__pokemon">
							<h1 class="data__name">${this.nombre}</h1>
							<div class="data__stats">
								<span class="data__stats--title">Estadisticas base</span>

								<div class="data__content--stast">
									<div class="data__container--stats">
										<span class="data__container--span">Ps</span>
										<span class="data__container--span">Ataque</span>
										<span class="data__container--span">Defensa</span>
										<span class="data__container--span">At. Especial</span>
										<span class="data__container--span">Def. Especial</span>
										<span class="data__container--span">Velocidad</span>
										<span class="data__container--span">Suma Total</span>
									</div>

									<div class="data__container--stats">
										<span class="data__container--number">${this.ps}</span>
										<span class="data__container--number">${this.ataque}</span>
										<span class="data__container--number">${this.defensa}</span>
										<span class="data__container--number">${this.ataqueEspecial}</span>
										<span class="data__container--number">${this.defensaEspecial}</span>
										<span class="data__container--number">${this.velocidad}</span>
										<span class="data__container--number">${SumaTotal}</span>
									</div>

									<div class="data__container--stats">
										<progress class="data__progress" value="${this.ps}" max="200"></progress>
										<progress class="data__progress" value="${this.ataque}" max="200"></progress>
										<progress class="data__progress" value="${this.defensa}" max="200"></progress>
										<progress class="data__progress" value="${this.ataqueEspecial}" max="200"></progress>
										<progress class="data__progress" value="${this.defensaEspecial}" max="200"></progress>
										<progress class="data__progress" value="${this.velocidad}" max="500"></progress>
										<progress class="data__progress" value="${SumaTotal}" max="1000"></progress>
									</div>
								</div>
							</div>
						</div>
					</div>

					<button class="data__close">
						<img src="Img/pokemon_moltres_icon-icons.com_67518.png" alt="">
					</button>`;

			return plantilla;
		},
	};
}

const Pokedex = (function () {
	const pokemons = [];
	const busquedasRecientes = [];

	const obtenerPokemon = async (id) => {
		const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const datos = await resultado.json();

		const tipos = datos.types.map((typeData) => typeData.type.name);

		return new Pokemon(
			datos.sprites.other['official-artwork'].front_default,
			datos.forms[0].name,
			datos.id,
			datos.types[0].type.name,
			tipos,
			datos.weight / 10,
			datos.height / 10,
			datos.stats[0].base_stat,
			datos.stats[1].base_stat,
			datos.stats[2].base_stat,
			datos.stats[3].base_stat,
			datos.stats[4].base_stat,
			datos.stats[5].base_stat
		);
	};

	const cargarPokemon = async () => {
		const loader = document.querySelector('.wrapper');

		loader.style.display = 'block';

		for (let i = 1; i <= 151; i++) {
			const pokemon = await obtenerPokemon(i);
			if (pokemon) {
				pokemons.push(pokemon);
			}
		}

		loader.style.display = 'none';
	};

	const dibujarPokedex = () => {
		const container = document.getElementById('boxes');

		pokemons.forEach((pokemon) => {
			container.innerHTML += pokemon.obtenerDatos();
		});
	};

	const buscarPokemon = async () => {
		const btnSearch = document.querySelector('.header__search--btn');

		btnSearch.addEventListener('click', async (e) => {
			e.preventDefault();
			const idPokemonInput = document.querySelector('.header__input--search');
			const idPokemon = idPokemonInput.value;

			if (!Number.isNaN(Number(idPokemon)) && idPokemon >= 1 && idPokemon <= 1010) {
				const id = parseInt(idPokemon);

				const header = document.querySelector('.header__search--pokemon');
				header.innerHTML = '';

				let pokemonEncontrado = null;

				busquedasRecientes.forEach((pokemon) => {
					if (pokemon.id === id) {
						pokemonEncontrado = pokemon;
					}
				});

				if (pokemonEncontrado) {
					idPokemonInput.value = ''; // Limpiar el campo de búsqueda
					header.innerHTML = ''; // Limpiar la pantalla antes de dibujar las nuevas búsquedas
					alert('Este pokemon ya se encuentra en pantalla');
					dibujarBusqueda();
				} else {
					idPokemonInput.value = ''; // Limpiar el campo de búsqueda
					header.innerHTML = ''; // Limpiar la pantalla antes de dibujar las nuevas búsquedas
					const pokemon = await obtenerPokemon(idPokemon);

					if (pokemon) {
						busquedasRecientes.unshift(pokemon); // Agrega el nuevo pokemon al inicio del array
						dibujarBusqueda();
					}
				}
			} else {
				idPokemonInput.value = ''; // Limpiar el campo de búsqueda
				alert('Esto no es una id o no se encuentra en el rango permitido');
			}
		});
	};

	const dibujarBusqueda = () => {
		const header = document.querySelector('.header__search--pokemon');
		header.innerHTML = '';

		busquedasRecientes.forEach((pokemon) => {
			const container = document.querySelector('.header__search--pokemon');
			const popup = document.getElementById('data');

			header.innerHTML += pokemon.obtenerDatos();

			container.addEventListener('click', async (e) => {
				if (e.target.closest('.box')) {
					popup.classList.add('data--active');
					const id = e.target.closest('.box').dataset.id;
					const resultado = await obtenerPokemon(id);
					const datosHTML = resultado.cargarDatos();
					const dataContent = document.querySelector('.data__content');
					dataContent.innerHTML = datosHTML;
				}
			});
		});
	};

	const datosPokemon = () => {
		const container = document.getElementById('boxes');
		const popup = document.getElementById('data');

		container.addEventListener('click', async (e) => {
			if (e.target.closest('.box')) {
				popup.classList.add('data--active');
				const id = e.target.closest('.box').dataset.id;
				const resultado = await obtenerPokemon(id);
				const datosHTML = resultado.cargarDatos();
				const dataContent = document.querySelector('.data__content');
				dataContent.innerHTML = datosHTML;
			}
		});
	};

	return {
		dibujarPokedex: dibujarPokedex,
		cargarPokemon: cargarPokemon,
		obtenerPokemon: obtenerPokemon,
		datosPokemon: datosPokemon,
		buscarPokemon: buscarPokemon,
	};
})();

Pokedex.cargarPokemon().then(() => {
	Pokedex.dibujarPokedex();
	Pokedex.datosPokemon();
	Pokedex.buscarPokemon(); // Agrega la funcionalidad de búsqueda
});

var loaderData = Pokedex.dibujarPokedex;

activeOpctions();
dataPokemon();
loaderData();
mobileActive();
//# sourceMappingURL=bundle.js.map
