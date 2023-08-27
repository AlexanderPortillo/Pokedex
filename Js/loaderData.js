import pokemon from './objectPokemon';

const container = document.getElementById('boxes');
const popup = document.getElementById('data');
const loader = document.querySelector('.wrapper');
const header = document.querySelector('.prueba');

const Pokedex = (function () {
	const pokemons = [];
	const busquedasRecientes = [];

	const obtenerPokemon = async (id) => {
		const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const datos = await resultado.json();

		const tipos = datos.types.map((typeData) => typeData.type.name);

		return new pokemon(
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
		loader.style.display = 'block';

		for (let i = 1; i <= 151; i++) {
			const pokemon = await obtenerPokemon(i);
			if (pokemon) {
				pokemons.push(pokemon);
			}
		}

		loader.style.display = 'none';
	};

	const buscarPokemon = async () => {
		const btnSearch = document.querySelector('.header__search--btn');

		btnSearch.addEventListener('click', async (e) => {
			e.preventDefault();
			const idPokemon = document.querySelector('.header__input--search').value;
			const pokemon = await obtenerPokemon(idPokemon);

			if (pokemon) {
				busquedasRecientes.unshift(pokemon); // Agrega el nuevo pokemon al inicio del array
				header.innerHTML = '';
				dibujarBusqueda();
			}
		});
	};

	const dibujarBusqueda = () => {
		busquedasRecientes.forEach((pokemon) => {
			header.innerHTML += pokemon.obtenerDatos();
		});
	};

	const dibujarPokedex = () => {
		pokemons.forEach((pokemon) => {
			container.innerHTML += pokemon.obtenerDatos();
		});
	};

	const datosPokemon = () => {
		container.addEventListener('click', async (e) => {
			const boxElement = e.target.closest('.box');

			if (boxElement) {
				popup.classList.add('data--active');
				popup.querySelector('.data__content').innerHTML =
					pokemons[boxElement.dataset.id - 1].cargarDatos();
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
