const select = document.querySelector('.form__select');
const selectOptions = document.querySelector('.form__select-options');

select.addEventListener('click', () => {
	select.classList.toggle('form__select--opened');
	selectOptions.classList.toggle('form__select-options--visible');
});
