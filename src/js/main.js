'use strict';

window.onload = () => {

	(function selectFunc() {
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
	})();

	(function formFunc() {
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
				if (window.innerHeight > popupForm.offsetHeight + 40) {
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
		});
	})();

	(function productsFunc() {
		// Products
		const popupLayout = document.querySelector('.popup-wrap');
		const popupProducts = document.querySelector('.popup-products');
		const productsLinks = document.querySelectorAll('.prod-spb__products-link');
		let productType;
		let productList;

		for (let link of productsLinks) {
			link.addEventListener('click', (e) => {
				e.preventDefault();

				productType = link.dataset.product;
				productList = document.querySelector(`.popup-products__list[data-list=${productType}]`);

				document.body.classList.add('blocked');
				popupLayout.style.display = 'block';
				popupProducts.style.display = 'block';
				productList.style.display = 'flex';
				if (window.innerHeight > popupProducts.offsetHeight) {
					popupLayout.style.display = 'flex';
					popupLayout.style.justifyContent = 'center';
					popupLayout.style.alignItems = 'center';
				}
			})
		}

		const btnClosePopupProducts = document.querySelector('.popup-products__btn-close');

		btnClosePopupProducts.addEventListener('click', () => {
			document.body.classList.remove('blocked');
			popupLayout.style.display = 'none';
			popupProducts.style.display = 'none';
			productList.style.display = 'none';
		});
	})()
};


