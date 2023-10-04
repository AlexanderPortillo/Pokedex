'use strict';

// !Creacion de constantes para el llamado de clases de la pokedex
const navbar = document.querySelector('.nav');
const search = document.querySelector('.header__search');
const itemOne = document.querySelector('.nav__li--one');
const itemTwo = document.querySelector('.nav__li--two');
const boxes = document.querySelector('.boxes');
const header = document.querySelector('.header__search--pokemon');
const mobile = document.querySelector('.mobile');

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

const contenido = document.getElementById('boxes');
const datos = document.getElementById('data');

const dataPokemon = () => {
	contenido.addEventListener('click', (e) => {
		if (e.target.closest('.box')) {
			datos.classList.add('data--active');
		}
	});

	datos.addEventListener('click', (e) => {
		const link = e.target.closest('button');

		if (link?.dataset?.accion === 'close') {
			datos.classList.remove('data--active');
		}
	});
};

// !Ubicamos la seleccion de color para las tarjeta tanto principal y secundaria
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

// !Funcion que almacena la informacion del pokemon y
// !utiliza el contenido que brinda background.js para
// !dar color a la tarjeta por el tipo de pokemon.
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
	velocidad,
	movimientos,
	habilidades
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
		movimientos: movimientos,
		habilidades: habilidades,
		// !Metodos que nos permiten crear las tarjetas y la ventana de informacion
		obtenerDatos: function () {
			// !Utilizamos el metodo map para iterar a traves de un array. Donde por cada
			// !elemento en ese array se esta creando un elemento en este caso un span.
			// !Luego todos estos elementos se estan concatenando en una cadena usando el metodo join
			const typeSpans = this.tipos
				.map((type) => `<span class="box__type">${type}</span>`)
				.join('');

			// !Se estructura la base de la tarjeta principal y muestra el contenido principal de cada pokemon
			const plantilla = `
                <div class="box" id="box" data-id="${
									this.id
								}" style="border: 4px solid ${background(
				this.tipo
			)}; box-shadow: 0 5px 20px ${background(this.tipo)};">
                    <div class="box__container" style="background-color: ${background(
											this.tipo
										)}; box-shadow: 0 5px 20px ${background(this.tipo)};">
                        <img src="${this.urlImagen}" alt="" class="box__img">
                    </div>
                    <span class="box__name--pokemon">${this.nombre}
					<br>
					N°. ${this.id}</span>
                    <div class="box__data--pokemon">
                        <div class="box__type--pokemon">
                            ${typeSpans}
                        </div>
                        <div class="box__data">
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

			const moves = this.movimientos
				.map(
					(move) =>
						`<span class="data__move" style="background-color: ${background(
							this.tipo
						)}; box-shadow: 0 0 10px ${background(this.tipo)};">${move}</span>`
				)
				.join('');

			const abilities = this.habilidades
				.map(
					(ability) =>
						`<span class="data__move" style="background-color: ${background(
							this.tipo
						)}; box-shadow: 0 0 10px ${background(this.tipo)};">${ability}</span>`
				)
				.join('');

			data.style.background = background(this.tipo);
			let SumaTotal =
				this.ps +
				this.ataque +
				this.defensa +
				this.ataqueEspecial +
				this.defensaEspecial +
				this.velocidad;

			// !Se estructura la base de la tarjeta secundaria y muestra el contenido secundario de cada pokemon, ademas extraemos datos de la Api
			const plantilla = `
					<div class="data__card">
						<div class="data__container">
							<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
								this.id
							}.gif"
								alt="" class="data__img--pokemon">
						</div>

						<div class="data__pokemon">
                        <h1 class="data__name">${this.nombre}</h1>

                        <div class="data__container--btn">
                            <button class="data__btn btn--abilities" data-accion="abilities" style="background-color: ${background(
															this.tipo
														)}; box-shadow: 0 0 10px ${background(
				this.tipo
			)};">Abilities</button>
                            <button class="data__btn btn--stats" data-accion="stats" style="background-color: ${background(
															this.tipo
														)}; box-shadow: 0 0 10px ${background(this.tipo)};">Stast</button>
                            <button class="data__btn btn--moves" data-accion="moves" style="background-color: ${background(
															this.tipo
														)}; box-shadow: 0 0 10px ${background(this.tipo)};">Moves</button>
                        </div>

                        <div class="data__abilities">
						${abilities}
						</div>

                        <div class="data__stats data--disabled">
                            <span class="data__stats--title">Stats</span>

                            <div class="data__content--stast">
                                <div class="data__container--stats">
                                    <span class="data__container--span">Hp</span>
                                    <span class="data__container--span">Attack</span>
                                    <span class="data__container--span">Defense</span>
                                    <span class="data__container--span">Special attack</span>
                                    <span class="data__container--span">Special defense</span>
                                    <span class="data__container--span">Speed</span>
                                    <span class="data__container--span">Total amount</span>
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

                        <div class="data__moves data--disabled">${moves}</div>
                    </div>
					</div>

					<button class="data__close" data-accion="close">
						<img src="Img/pokemon_moltres_icon-icons.com_67518.png" alt="">
					</button>`;

			return plantilla;
		},
	};
}

const Pokedex = (function () {
	// !Array donde guardamos los pokemons para luego mostrarlos
	const pokemons = [];
	// !Array donde guardamos los pokemons buscados para luego mostrarlos
	const busquedasRecientes = [];

	const obtenerPokemon = async (id) => {
		// !Busqueda de datos en la Api
		const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const datos = await resultado.json();

		// !Consigue el tipo de dato del pokemon
		const tipos = datos.types.map((typeData) => typeData.type.name);
		const movimientos = datos.moves.map((moveData) => moveData.move.name);
		const habilidades = datos.abilities.map((abi) => abi.ability.name);

		// !Creamos los nuevos objetos para los pokemons que se necesiten y llamamos sus datos
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
			datos.stats[5].base_stat,
			movimientos,
			habilidades
		);
	};

	// !Carga los 151 pokemon de la Podex haciendo un for que recorre los datos de cada pokemon
	const cargarPokemon = async () => {
		const loader = document.querySelector('.wrapper');

		// !Activamos el loader para que se muestre mientras los pokemons se estan cargandos
		loader.style.display = 'block';

		for (let i = 1; i <= 1; i++) {
			// !Llamamos a la funcion obtenerPokemon y le pasamos un valor el cual el for
			// !seguira aumentando hasta llegar a lo establecido, este valor seria el id
			// !del pokemon el cual se encuentra en la api, de ser encontrado este se mandara a llamar
			// !y asi toda su informacion tambien, luego agregamos este pokemon a nuestro array, y asi
			// !sucesivamente con todos los demas
			const pokemon = await obtenerPokemon(i);
			if (pokemon) {
				pokemons.push(pokemon);
			}
		}

		loader.style.display = 'none'; // !Cuando no aparece un dato existente
	};

	const dibujarPokedex = () => {
		const container = document.getElementById('boxes');

		// !Empezamos a recorrer nuetro array para poder imprimir los pokemons, mediante el metodo
		// !obtenerDatos el cual esta contenido en nuestro objeto principal, los valores de los pokemons
		// !seran invocados a traves de este metodo, luego de haber extraido la informacion del primer
		// !pokemon este sera colocado en pantalla y asi sucesivamente con los demas pokemons
		pokemons.forEach((pokemon) => {
			container.innerHTML += pokemon.obtenerDatos();
		});
	};

	const buscarPokemon = async () => {
		// !Llamamos a nuestro input el cual contiene la informacion necesaria para buscar un pokemon
		const btnSearch = document.querySelector('.header__search--btn');

		btnSearch.addEventListener('click', async (e) => {
			e.preventDefault();
			const idPokemonInput = document.querySelector('.header__input--search');
			const idPokemon = idPokemonInput.value;

			// !Verificamos que el string se pueda cnvertir a un numero y que este se encuentre en el
			// !rango de 1 y 1010 ya que este es el maximo de pokemons en la api utilizada, luego de cumplirse
			// !estas condiciones el valor obtenido lo transformamos a un numero para poder utilizarlo
			if (!Number.isNaN(Number(idPokemon)) && idPokemon >= 1 && idPokemon <= 1010) {
				const id = parseInt(idPokemon);

				const header = document.querySelector('.header__search--pokemon');
				// !Limpiamos la pantalla
				header.innerHTML = '';

				let pokemonEncontrado = null;

				// !Busca a cada pokemon
				busquedasRecientes.forEach((pokemon) => {
					if (pokemon.id === id) {
						pokemonEncontrado = pokemon;
					}
				});

				if (pokemonEncontrado) {
					idPokemonInput.value = ''; // !Limpia el campo de búsqueda
					header.innerHTML = ''; // !Limpia la pantalla antes de dibujar las nuevas búsquedas
					alert('Este pokemon ya se encuentra en pantalla');
					dibujarBusqueda();
				} else {
					idPokemonInput.value = ''; // !Limpia el campo de búsqueda
					header.innerHTML = ''; // !Limpia la pantalla antes de dibujar las nuevas búsquedas
					// !Pasamos el valor obtenido a la funcion obtenerPokemon el cual nos devolvera toda
					// !la informacion del pokemon llamado
					const pokemon = await obtenerPokemon(idPokemon);

					if (pokemon) {
						busquedasRecientes.unshift(pokemon); // !Agrega el nuevo pokemon al inicio del array
						// !Llamamos a la funcion que nos permitira agregar en pantalla el pokemon que se esta buscando
						dibujarBusqueda();
					}
				}
			} else {
				idPokemonInput.value = ''; // !Limpiar el campo de búsqueda
				alert('Esto no es una id o no se encuentra en el rango permitido');
			}
		});
	};

	const dibujarBusqueda = () => {
		const header = document.querySelector('.header__search--pokemon');
		header.innerHTML = '';

		// !Busca a cada pokemon que se encuntre guardado en el array
		busquedasRecientes.forEach((pokemon) => {
			const container = document.querySelector('.header__search--pokemon');
			const popup = document.getElementById('data');

			header.innerHTML += pokemon.obtenerDatos();

			container.addEventListener('click', async (e) => {
				if (e.target.closest('.box')) {
					// !Activamos la ventana donde se muestra la informacion de los pokemons
					popup.classList.add('data--active');
					// !Extraemos el un valor que se añade en cada tarjeta al crear esta misma el cual es
					// !el id del pokemon para que cuado se haga click sobre la tarjeta ella nos regrese este id
					// !y asi poder realizar una nueva busqueda para mostrar esta informacion
					const id = e.target.closest('.box').dataset.id;
					// !Pasamos el id para extraer la informacion
					const resultado = await obtenerPokemon(id);
					// !Cargamos los datos encontrados
					const datosHTML = resultado.cargarDatos();
					const dataContent = document.querySelector('.data__content');
					// !Agregamos los datos en pantalla
					dataContent.innerHTML = datosHTML;

					// !Estructura que nos permite movilizarnos entre las opciones de la tarjeta
					const data = document.querySelector('.data__card');
					const abilities = document.querySelector('.data__abilities');
					const stats = document.querySelector('.data__stats');
					const moves = document.querySelector('.data__moves');

					const btnAbilities = document.querySelector('.btn--abilities');
					const btnStats = document.querySelector('.btn--stats');
					const btnMoves = document.querySelector('.btn--moves');

					btnAbilities.classList.add('data__btn--active');
					data.addEventListener('click', (e) => {
						const active = e.target.closest('button');

						if (active?.dataset?.accion === 'abilities') {
							e.preventDefault();
							abilities.classList.remove('data--disabled');
							stats.classList.add('data--disabled');
							moves.classList.add('data--disabled');
							btnAbilities.classList.add('data__btn--active');
							btnStats.classList.remove('data__btn--active');
							btnMoves.classList.remove('data__btn--active');
						}

						if (active?.dataset?.accion === 'stats') {
							e.preventDefault();
							abilities.classList.add('data--disabled');
							stats.classList.remove('data--disabled');
							moves.classList.add('data--disabled');
							btnAbilities.classList.remove('data__btn--active');
							btnStats.classList.add('data__btn--active');
							btnMoves.classList.remove('data__btn--active');
						}

						if (active?.dataset?.accion === 'moves') {
							e.preventDefault();
							abilities.classList.add('data--disabled');
							stats.classList.add('data--disabled');
							moves.classList.remove('data--disabled');
							btnAbilities.classList.remove('data__btn--active');
							btnStats.classList.remove('data__btn--active');
							btnMoves.classList.add('data__btn--active');
						}
					});
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

				const data = document.querySelector('.data__card');
				const abilities = document.querySelector('.data__abilities');
				const stats = document.querySelector('.data__stats');
				const moves = document.querySelector('.data__moves');

				const btnAbilities = document.querySelector('.btn--abilities');
				const btnStats = document.querySelector('.btn--stats');
				const btnMoves = document.querySelector('.btn--moves');
				btnAbilities.classList.add('data__btn--active');

				data.addEventListener('click', (e) => {
					const active = e.target.closest('button');

					if (active?.dataset?.accion === 'abilities') {
						e.preventDefault();
						abilities.classList.remove('data--disabled');
						stats.classList.add('data--disabled');
						moves.classList.add('data--disabled');
						btnAbilities.classList.add('data__btn--active');
						btnStats.classList.remove('data__btn--active');
						btnMoves.classList.remove('data__btn--active');
					}

					if (active?.dataset?.accion === 'stats') {
						e.preventDefault();
						abilities.classList.add('data--disabled');
						stats.classList.remove('data--disabled');
						moves.classList.add('data--disabled');
						btnAbilities.classList.remove('data__btn--active');
						btnStats.classList.add('data__btn--active');
						btnMoves.classList.remove('data__btn--active');
					}

					if (active?.dataset?.accion === 'moves') {
						e.preventDefault();
						abilities.classList.add('data--disabled');
						stats.classList.add('data--disabled');
						moves.classList.remove('data--disabled');
						btnAbilities.classList.remove('data__btn--active');
						btnStats.classList.remove('data__btn--active');
						btnMoves.classList.add('data__btn--active');
					}
				});
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
	Pokedex.buscarPokemon(); // !Agrega la funcionalidad de búsqueda
});

var loaderData = Pokedex.dibujarPokedex;

activeOpctions();
dataPokemon();
loaderData();
mobileActive();
//# sourceMappingURL=bundle.js.map
