var color;

export default function Pokemon(urlImagen, nombre, id, tipo) {
	return {
		urlImagen: urlImagen,
		nombre: nombre,
		id: id,
		tipo: tipo,
		obtenerDatos: function () {
			switch (this.tipo) {
				case 'grass':
					color = 'green';
					break;
				case 'fire':
					color = 'red';
					break;
				case 'water':
					color = 'cyan';
					break;
				default:
					color = 'transparent;'
					break;
			}

			const plantilla = `
                <div class="box" id="box" data-id="${this.id}">
                    <div class="box__container" style="background-color: ${color};">
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
			switch (this.tipo) {
				case 'grass':
					color = 'rgba(0, 128, 0, 0.452)';
					break;
				case 'fire':
					color = 'rgba(0, 128, 0, 0.452)';
					break;
				case 'water':
					color = 'rgba(0, 128, 0, 0.452)';
					break;
				default:
					break;
			}
			const data = document.querySelector('.data__content');
			data.style.background = color;

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
