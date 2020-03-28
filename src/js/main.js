'use strict';

window.onload = () => {


	// Selects
	const selects = document.querySelectorAll('.form__select');

	for (let select of selects) {
		select.addEventListener('click', () => {
			let selectOptions = select.querySelector('.form__select-options');

			select.classList.toggle('form__select--opened');
			selectOptions.classList.toggle('form__select-options--visible');
		});
	}


	// Menus & menus' buttons
	const menuBtnOpen = document.querySelector('.header__menu-btn');
	const menuBtnClose = document.querySelector('.header__menu-btn-close');
	const headerMenu = document.querySelector('.header__menu');

	menuBtnOpen.addEventListener('click', () => {
		headerMenu.classList.add('header__menu--opened');
	});

	menuBtnClose.addEventListener('click', () => {
		headerMenu.classList.remove('header__menu--opened');
	});


	// Form
	const btnsForm = document.querySelectorAll('.formopen');
	const popupLayout = document.querySelector('.popup-wrap');
	const popupForm = document.querySelector('.popup-form');
	const btnClosePopupForm = document.querySelector('.popup-form__btn-close');


	for (let btn of btnsForm) {
		btn.addEventListener('click', () => {
			document.body.classList.add('blocked');
			popupLayout.style.display = 'block';
			popupForm.style.display = 'block';
			if ( window.innerHeight > popupForm.offsetHeight + 40 ) {
				popupLayout.style.display = 'flex';
				popupLayout.style.justifyContent = 'center';
				popupLayout.style.alignItems = 'center';
			}
		});
	}

	btnClosePopupForm.addEventListener('click', () => {
		document.body.classList.remove('blocked');
		popupLayout.style.display = 'none';
		popupForm.style.display = 'none';
	})

};
