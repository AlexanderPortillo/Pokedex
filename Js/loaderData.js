import Pokemon from './objectPokemon';

const Pokedex = (function () {
	const pokemons = [];
	const busquedasRecientes = [];

	const obtenerPokemon = async (id) => {
		const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const datos = await resultado.json();

		const tipos = datos.types.map((typeData) => typeData.type.name);
		const movimientos = datos.moves.map((moveData) => moveData.move.name);
		const habilidades = datos.abilities.map((abi) => abi.ability.name);

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
					const data = document.querySelector('.data__card');
					const abilities = document.querySelector('.data__abilities');
					const stats = document.querySelector('.data__stats');
					const moves = document.querySelector('.data__moves');

					const btnAbilities = document.querySelector('.btn--abilities');
					const btnStats = document.querySelector('.btn--stats');
					const btnMoves = document.querySelector('.btn--moves');

					data.addEventListener('click', (e) => {
						const active = e.target.closest('button');
						btnAbilities.classList.add('data__btn--active');

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

				data.addEventListener('click', (e) => {
					const active = e.target.closest('button');
					btnAbilities.classList.add('data__btn--active');

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
	Pokedex.buscarPokemon(); // Agrega la funcionalidad de búsqueda
});

export default Pokedex.dibujarPokedex;
