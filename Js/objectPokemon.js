import background from './background';

export default function Pokemon(urlImagen, nombre, id, tipo, peso, altura) {
	return {
		urlImagen: urlImagen,
		nombre: nombre,
		id: id,
		tipo: tipo,
		peso: peso,
		altura: altura,
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
						<img src="Img/pokemon_moltres_icon-icons.com_67518.png" alt="">
					</button>`;

			return plantilla;
		},
	};
}
