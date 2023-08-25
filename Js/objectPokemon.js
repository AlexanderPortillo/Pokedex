export default function Pokemon(urlImagen, nombre, id, tipo) {
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
