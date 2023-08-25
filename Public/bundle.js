'use strict';

const navbar = document.querySelector('.nav');
const search = document.querySelector('.header__search');
const itemOne = document.querySelector('.nav__li--one');
const itemTwo = document.querySelector('.nav__li--two');
const boxes = document.querySelector('.boxes');

const activeOpctions = () => {
	navbar.addEventListener('click', (e) => {
		const link = e.target.closest('a');

		// !Activamos el buscador
		if (link?.dataset?.accion === 'home') {
			e.preventDefault();
			search.classList.add('header--active');
			itemOne.classList.add('nav__li--active');
			itemTwo.classList.remove('nav__li--active');
			boxes.classList.remove('boxes--active');
		}

		// !Activamos la pokedex
		if (link?.dataset?.accion === 'pokedex') {
			e.preventDefault();
			search.classList.remove('header--active');
			itemOne.classList.remove('nav__li--active');
			itemTwo.classList.add('nav__li--active');
			boxes.classList.add('boxes--active');
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

function Pokemon(urlImagen, nombre, id, tipo) {
	return {
		urlImagen: urlImagen,
		nombre: nombre,
		id: id,
		tipo: tipo,
		obtenerDatos: function () {
			const plantilla = `
                <div class="box" id="box" data-id="${this.id}">
                    <div class="box__container">
                        <img src="${this.urlImagen}"
                            alt="" class="box__img">
                    </div>

                    <span class="box__name--pokemon">${this.nombre}</span>

                    <div class="box__data--pokemon">
                        <span class="box__id--pokemon">N.° ${this.id}</span>

                        <div class="box__type--pokemon">
                            <span class="box__type">${this.tipo}</span>
                        </div>
                    </div>
                </div>`;
			return plantilla;
		},

		cargarDatos: function () {
			const plantilla = `
					<div class="data__card">
						<div class="data__container">
							<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${this.id}.gif"
								alt="" class="data__img--pokemon">
						</div>

						<div class="data__pokemon">
						<h1 class="data__name">${this.nombre}</h1>
						</div>
					</div>

					<button class="data__close">
						<i class="fas fa-times"></i>
					</button>`;

			return plantilla;
		},
	};
}

const container = document.getElementById('boxes');
const popup = document.getElementById('data');
const loader = document.querySelector('.wrapper');

const Pokedex = (function object() {
	const pokemons = [];

	const obtenerPokemon = async (id) => {
		const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const datos = await resultado.json();
		return Pokemon(
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
var loaderData = Pokedex.dibujarPokedex;

activeOpctions();
dataPokemon();
loaderData();
//# sourceMappingURL=bundle.js.map
