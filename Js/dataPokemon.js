const contenido = document.getElementById('boxes');
const datos = document.getElementById('data');

const dataPokemon = () => {
	contenido.addEventListener('click', (e) => {
		if (e.target.closest('.box')) {
			datos.classList.add('data--active');
		}
	});

	datos.addEventListener('click', (e) => {
		const link = e.target.closest('button');

		if (link?.dataset?.accion === 'close') {
			datos.classList.remove('data--active');
		}
	});
};

export default dataPokemon;
