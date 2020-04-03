'use strict';

window.onload = () => {

	(function selectFunc() {
		// Selects
		const selects = document.querySelectorAll('.form__select');
		const selectOptions = document.querySelectorAll('.form__select-option');
		const selectValue = document.querySelector('.form__select-value');

		for (let select of selects) {
			select.addEventListener('click', () => {
				let selectOptions = select.querySelector('.form__select-options');

				select.classList.toggle('form__select--opened');
				selectOptions.classList.toggle('form__select-options--visible');
			});
		}

		for (let option of selectOptions) {
			option.addEventListener('click', () => {
				if ( option.textContent ) {
					selectValue.dataset.activeoption = option.dataset.option;
					selectValue.textContent = option.textContent;
				} else {
					selectValue.dataset.activeoption = option.dataset.option;
					selectValue.textContent = 'Выберите услугу';
				}
			})
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
	})();

	(function casesFunc() {
		// Cases

		let popupLayout;
		let popupCases;
		const casesLinks = document.querySelectorAll('.cases__item-link');

		let caseName;
		let productList;
		let imagesAmount;

		for (let link of casesLinks) {
			link.addEventListener('click', (e) => {
				e.preventDefault();

				caseName = link.dataset.name;
				imagesAmount = link.dataset.amount;
				productList = document.querySelector(`.popup-cases__list`);

				for (let i = 1; i <= imagesAmount; i++) {
					let listItem = document.createElement('li');
					let imgItem = document.createElement('img');

					imgItem.classList.add('popup-cases__image');
					imgItem.src = `img/block-cases/${caseName}_${i}.jpg`;
					listItem.append(imgItem);
					productList.append(listItem);
				}

				popupLayout = document.querySelector('.popup-wrap');
				popupCases = document.querySelector('.popup-cases');

				document.body.classList.add('blocked');
				popupLayout.style.display = 'block';
				popupCases.style.display = 'block';
				productList.style.display = 'flex';
				// if (window.innerHeight > popupCases.offsetHeight) {
				// 	popupLayout.style.display = 'flex';
				// 	popupLayout.style.justifyContent = 'center';
				// 	popupLayout.style.alignItems = 'center';
				// }
			})
		}

		const btnClosePopupProducts = document.querySelector('.popup-cases__btn-close');

		btnClosePopupProducts.addEventListener('click', () => {
			document.body.classList.remove('blocked');
			popupLayout.style.display = 'none';
			popupCases.style.display = 'none';
			productList.style.display = 'none';
			productList.innerHTML = '';
		});
	})();

	(function showMoreFunc() {
		const showMoreBtn = document.querySelector('.btn__show-more');
		const casesList = document.querySelectorAll('.cases__item');

		let hiddenCases = [];

		for ( let caseItem of casesList ) {
			let caseDisplay = getComputedStyle(caseItem).display;

			if ( caseDisplay === 'none' ) {
				hiddenCases.push(caseItem);
			}
		}

		showMoreBtn.addEventListener('click', () => {
			let i = 0;
			while ( i < 3 ) {
				hiddenCases[0].style.display = 'block';
				hiddenCases.shift();

				if ( !hiddenCases.length ) {
					showMoreBtn.style.display = 'none';
					break;
				}
				i++;
			}
			i = 0;
		});
	})();

	(function faqOpen() {

		const faqItems = document.querySelectorAll('.faq__item');

		for ( let item of faqItems ) {
			item.addEventListener('click', () => {

				item.classList.toggle('faq__item--opened');

			})
		}

	})();

	(function telephoneMask() {
		const maskSelector = document.querySelector(".form__input-telephone");

		let im = new Inputmask("999-999-99-99");
		im.mask(maskSelector);
	})();

	function checkForm(event, form) {
		let sendState = true;

		const nameInput = form.querySelector('.form__input-name');
		const emailInput = form.querySelector('.form__input-email');
		const phoneInput = form.querySelector('.form__input-telephone');
		const phoneNumber = '+7' + phoneInput.value.replace(/-/g, '');
		const selectValue = form.querySelector('.form__select-value');
		const textarea = form.querySelector('.form__textarea');
		const checkBox = form.querySelector('.form__checkbox');

		const errorMsg = form.querySelector('.form__error');

		const emailRegExp = /^.+@.+\..+$/igm;
		const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/gm;


		if ( !nameInput.value.trim()) {
			nameInput.classList.add('form__error-field');
			sendState = false;
		}

		if ( !emailRegExp.test(emailInput.value) ) {
			emailInput.classList.add('form__error-field');
			sendState = false;
		}

		if ( !phoneRegExp.test(phoneNumber)) {
			phoneInput.parentElement.classList.add('form__error-field');
			sendState = false;
		}

		if ( parseInt(selectValue.dataset.activeoption, 10) === 0 ) {
			selectValue.closest('.form__select').classList.add('form__error-field');
			sendState = false;
		}

		if ( !textarea.value ) {
			textarea.classList.add('form__error-field');
			sendState = false;
		}

		if ( !checkBox.checked ) {
			sendState = false;
		}

		if ( sendState ) {
			return true
		} else {
			errorMsg.classList.add('form__error--visible');
			event.preventDefault();
			return false
		}
	};

	(function sendFormEvents() {

		const formList = document.forms;

		for ( let formElem of formList ) {
			formElem.addEventListener('submit', (event) => {
				checkForm(event, formElem);
			}, false);
			formElem.submit = (event) => {
				checkForm(event, formElem);
			};
		}

	})();
};


