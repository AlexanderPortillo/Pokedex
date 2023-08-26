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

function Pokemon(
	urlImagen,
	nombre,
	id,
	tipo,
	peso,
	altura,
	ps,
	ataque,
	defensa,
	ataqueEspecial,
	defensaEspecial,
	velocidad,
) {
	return {
		urlImagen: urlImagen,
		nombre: nombre,
		id: id,
		tipo: tipo,
		peso: peso,
		altura: altura,
		ps: ps,
		ataque: ataque,
		defensa: defensa,
		ataqueEspecial: ataqueEspecial,
		defensaEspecial: defensaEspecial,
		velocidad: velocidad,
		obtenerDatos: function () {
			const plantilla = `
                <div class="box" id="box" data-id="${this.id}">
                    <div class="box__container" style="background-color: ${background(
											this.tipo
										)};">
                        <img src="${this.urlImagen}"
                            alt="" class="box__img">
                    </div>

                    <span class="box__name--pokemon">${this.nombre} - N.° ${this.id}</span>

                    <div class="box__data--pokemon">
                        <div class="box__type--pokemon">
                            <span class="box__type">${this.tipo}</span>
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

const container = document.getElementById('boxes');
const popup = document.getElementById('data');
const loader = document.querySelector('.wrapper');
// var tamañoTypes;

const Pokedex = (function object() {
	const pokemons = [];

	const obtenerPokemon = async (id) => {
		const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const datos = await resultado.json();
		// tamañoTypes = datos.types.length;

		return Pokemon(
			datos.sprites.other['official-artwork'].front_default,
			datos.forms[0].name,
			datos.id,
			datos.types[0].type.name,
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
