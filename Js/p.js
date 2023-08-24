const pokemons = async () => {
	const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
	const box = document.querySelector('.boxes');

	try {
		box.innerHTML = ''; // Usar innerHTML en lugar de box.appendChild
		const respuesta = await fetch(url);
		const datos = await respuesta.json();
		const resultado = datos.results; // Usar datos.results en lugar de datos
		console.log(resultado);

		resultado.forEach(async (element) => {
			const pokeurl = element.url;
			const respuesta2 = await fetch(pokeurl);
			const datos2 = await respuesta2.json();
			console.log(datos2);

			const plantilla = `
          <div class="box" data-id="33">
            <div class="box__container">
              <img src="${datos2.sprites.other.dream_world.front_default}"
                alt="" class="box__img"> <!-- Usar element.url para obtener el número de Pokémon -->
            </div>
  
            <span class="box__name--pokemon">${element.name}</span>
  
            <div class="box__data--pokemon">
              <span class="box__id--pokemon">N.° </span> <!-- Usar element.url para obtener el número de Pokémon -->
              <div class="box__type--pokemon">
                <!-- Aquí puedes agregar un bucle para recorrer los tipos -->
              </div>
            </div>
          </div>`;

			box.insertAdjacentHTML('beforeend', plantilla);
		});

		// console.log(resultado.results);
	} catch (e) {
		console.log(e);
	}
};

pokemons();
