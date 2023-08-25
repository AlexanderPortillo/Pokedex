import pokemon from './objectPokemon';

const container = document.getElementById('boxes');
const popup = document.getElementById('data');
const loader = document.querySelector('.wrapper');

const Pokedex = (function object() {
	const pokemons = [];

	const obtenerPokemon = async (id) => {
		const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const datos = await resultado.json();
		return pokemon(
			datos.sprites.other['official-artwork'].front_default,
			datos.forms[0].name,
			datos.id,
			datos.types[0].type.name
		);
	};

	const cargarPokemon = async () => {
		loader.style.display = 'block'; // Muestra el loader al iniciar la carga

		for (let i = 1; i <= 151; i++) {
			const pokemon = await obtenerPokemon(i);
			if (pokemon) {
				pokemons.push(pokemon);
			}
		}

		loader.style.display = 'none'; // Oculta el loader cuando la carga ha finalizado
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
	};
})();

// Carga los Pokémon y luego dibuja la Pokédex en el documento.
Pokedex.cargarPokemon().then(() => {
	Pokedex.dibujarPokedex();
	Pokedex.datosPokemon();
});

// Exporta la función dibujarPokedex del módulo Pokedex.
export default Pokedex.dibujarPokedex;
