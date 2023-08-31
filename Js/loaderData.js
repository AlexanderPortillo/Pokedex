import Pokemon from './objectPokemon';

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

		for (let i = 1; i <= 151; i++) {
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

export default Pokedex.dibujarPokedex;
