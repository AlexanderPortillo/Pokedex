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

export default dataPokemon;
