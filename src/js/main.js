'use strict';

window.onload = () => {

	(function selectFunc() {
		// Selects
		const selects = document.querySelectorAll('.form__select');

		for (let select of selects) {
			select.addEventListener('click', () => {
				let selectList = select.querySelector('.form__select-options');

				select.classList.toggle('form__select--opened');
				selectList.classList.toggle('form__select-options--visible');
			});

			const selectOptions = select.querySelectorAll('.form__select-option');
			const selectValue = select.querySelector('.form__select-value');

			for (let option of selectOptions) {
				option.addEventListener('click', () => {
					if ( option.textContent ) {
						selectValue.dataset.activeoption = option.dataset.option;
						selectValue.textContent = option.textContent;
						if ( selectValue.closest('.form__error-field') ) {
							selectValue.closest('.form__error-field').classList.remove('form__error-field')
						}
					} else {
						selectValue.dataset.activeoption = option.dataset.option;
						selectValue.textContent = 'Выберите услугу';
					}
				})
			}
		}
	})();

	(function openMenu() {
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
		const productsBtnClose = document.querySelector('.popup-products__btn-close');
		let productsLabel = document.querySelector('.popup-products__label');
		let productType;
		let productList;

		for (let link of productsLinks) {
			link.addEventListener('click', (e) => {
				e.preventDefault();

				productType = link.dataset.product;
				productList = document.querySelector(`.popup-products__list[data-list=${productType}]`);

				let text = '';

				switch (productType) {
					case 'sweetshot':
						text = 'Свитшоты';
						break;
					case 'shirt':
						text = 'Футболки';
						break;
					case 'hoodie':
						text = 'Худи';
						break;
					case 'shopper':
						text = 'Шоппер';
						break;
					case 'bag':
						text = 'Поясная сумка';
						break;
					case 'suvenirka':
						text = 'Сувенирка';
						break;
				}

				productsLabel.textContent = text;

				document.body.classList.add('blocked');
				popupLayout.style.display = 'block';
				popupProducts.style.display = 'block';
				productList.style.display = 'flex';
				productsBtnClose.style.position = 'fixed';
				if (window.innerHeight > popupProducts.offsetHeight) {
					popupLayout.style.display = 'flex';
					popupLayout.style.justifyContent = 'center';
					popupLayout.style.alignItems = 'center';
					productsBtnClose.style.position = 'absolute';
				}
			})
		}

		const btnClosePopupProducts = document.querySelector('.popup-products__btn-close');

		btnClosePopupProducts.addEventListener('click', () => {
			popupLayout.scrollTo(0, 0);
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
					listItem.classList.add('popup-cases__list-item');
					let imgItem = document.createElement('img');

					imgItem.classList.add('popup-cases__image');
					imgItem.src = `img/block-cases/${caseName}_${i}.jpg`;
					listItem.append(imgItem);
					productList.append(listItem);
				}

				popupLayout = document.querySelector('.popup-wrap');
				popupCases = document.querySelector('.popup-cases');
				const popupCasesLabel = document.querySelector('.popup-cases__label');

				let text = '';

				switch (caseName) {
					case 'kashin':
						text = 'Кашин';
						break;
					case 'mozee':
						text = 'Mozee Montana';
						break;
					case 'alisher':
						text = 'Алишер Моргенштерн';
						break;
					case 'lizzka':
						text = 'l1zzka';
						break;
					case 'sqwozbab':
						text = 'Sqwoz bab';
						break;
					case 'kfc':
						text = 'KFC';
						break;
					case 'mukka':
						text = 'Мукка';
						break;
					case 'booker':
						text = 'Booker';
						break;
					case 'monetochka':
						text = 'Лиза Монеточка';
						break;
					case 'anastasiz':
						text = 'Анастасиз';
						break;
					case 'asya':
						text = 'Асинастра';
						break;
					case 'karamba':
						text = 'Каррамбейби';
						break;
					case 'mamcupy':
						text = 'Мам, купи!';
						break;
					case 'sover':
						text = 'Совергон';
						break;
					case 'sveta':
						text = 'Дейдример';
						break;
					case 'sviter':
						text = 'Коллекция вязаных вещей 2019';
						break;
				}

				popupCasesLabel.textContent = text;

				document.body.classList.add('blocked');
				popupLayout.style.display = 'block';
				popupCases.style.display = 'block';
				productList.style.display = 'flex';
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
			while ( i < 4 ) {
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

				let itemAnswer = item.querySelector('.faq__answer-inner');
				item.classList.toggle('faq__item--opened');

				if ( item.classList.contains('faq__item--opened') ) {
					itemAnswer.parentElement.style.height = itemAnswer.scrollHeight + 'px';
				} else {
					itemAnswer.parentElement.style.height = '0px';
				}

			})
		}

	})();

	(function telephoneMask() {
		const maskSelectors = document.querySelectorAll(".form__input-telephone");

		for ( let maskSelector of maskSelectors ) {
			let im = new Inputmask("999-999-99-99");
			im.mask(maskSelector);
		}
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
		const checkBoxLabel = form.querySelector('.form__checkbox-label');

		const errorMsg = form.querySelector('.form__error');

		const emailRegExp = /^.+@.+\..+$/igm;
		const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/gm;


		if ( !nameInput.value.trim()) {
			nameInput.classList.add('form__error-field');
			sendState = false;
		} else if ( nameInput.classList.contains('form__error-field') ) {
			nameInput.classList.remove('form__error-field')
		}

		if ( !emailRegExp.test(emailInput.value) ) {
			emailInput.classList.add('form__error-field');
			sendState = false;
		} else if ( emailInput.classList.contains('form__error-field') ) {
			emailInput.classList.remove('form__error-field')
		}

		if ( !phoneRegExp.test(phoneNumber)) {
			phoneInput.parentElement.classList.add('form__error-field');
			sendState = false;
		} else if ( phoneInput.parentElement.classList.contains('form__error-field') ) {
			phoneInput.parentElement.classList.remove('form__error-field')
		}

		if ( parseInt(selectValue.dataset.activeoption, 10) === 0 ) {
			selectValue.closest('.form__select').classList.add('form__error-field');
			sendState = false;
		} else if ( selectValue.closest('.form__select').classList.contains('form__error-field') ) {
			selectValue.closest('.form__select').classList.remove('form__error-field')
		}

		if ( !textarea.value ) {
			textarea.classList.add('form__error-field');
			sendState = false;
		} else if ( textarea.classList.contains('form__error-field') ) {
			textarea.classList.remove('form__error-field');
		}

		if ( !checkBox.checked ) {
			checkBoxLabel.classList.add('form__checkbox-label--error');
			sendState = false;
		} else if ( checkBoxLabel.classList.contains('form__checkbox-label--error') ) {
			checkBoxLabel.classList.remove('form__checkbox-label--error')
		}

		if ( sendState ) {
			$.post('../send.php', {
				name: nameInput.value.trim(),
				email: emailInput.value,
				phone: phoneNumber,
				service: selectValue.textContent,
				message: textarea.value
			});
			nameInput.value = '';
			emailInput.value = '';
			phoneInput.value = '';
			selectValue.dataset.activeoption = '0';
			selectValue.textContent = 'Выберите услугу';
			textarea.value = '';
			checkBox.checked = false;
			showSendSuccess(form);
			return true
		} else {
			errorMsg.classList.add('form__error--visible');
			event.preventDefault();
			return false
		}
	};

	(function inputChange() {

		const formList = document.forms;

		for ( let form of formList ) {
			const inputFields = form.querySelectorAll('.form__input-name, .form__input-email, .form__input-telephone, .form__textarea');
			const checkboxFields = form.querySelectorAll('.form__checkbox');
			const errorMsg = form.querySelector('.form__error');

			for ( let inputItem of inputFields ) {
				inputItem.oninput = () => {
					if ( inputItem.closest('.form__error-field') ) {
						inputItem.closest('.form__error-field').classList.remove('form__error-field');
					}

					if ( errorMsg.classList.contains('form__error--visible') ) {
						errorMsg.classList.remove('form__error--visible');
					}
				}
			}

			for ( let checkbox of checkboxFields ) {
				checkbox.onchange = () => {
					if ( checkbox.nextElementSibling.classList.contains('form__checkbox-label--error') ) {
						checkbox.nextElementSibling.classList.remove('form__checkbox-label--error');
					}

					if ( errorMsg.classList.contains('form__error--visible') ) {
						errorMsg.classList.remove('form__error--visible');
					}
				}
			}
		}
	})();

	(function sendFormEvents() {

		const formList = document.forms;

		for ( let formElem of formList ) {
			formElem.submit = (event) => {
				checkForm(event, formElem);
			};

			formElem.querySelector('button[type="button"]').addEventListener('click', (event) => {
				checkForm(event, formElem);
			})
		}

	})();

	(function recallPopup() {
		const popupRecall = document.querySelector('.popup-recall');
		const popupRecallBtn = document.querySelector('.popup-recall .btn__request');
		const popupRecallBtnClose = popupRecall.querySelector('.popup-recall__btn-close');
		const phoneInput = popupRecall.querySelector('.form__input-telephone');
		const errorMsg = popupRecall.querySelector('.popup-recall__error');

		setTimeout(() => {
			popupRecall.classList.add('popup-recall--visible');
		}, 300000);

		phoneInput.oninput = () => {
			phoneInput.parentElement.classList.remove('form__error-field');
			errorMsg.style.visibility = 'hidden';
		}

		function sendRecall() {
			const phoneNumber = '+7' + phoneInput.value.replace(/-/g, '');
			const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/gm;

			if ( !phoneRegExp.test(phoneNumber)) {
				phoneInput.parentElement.classList.add('form__error-field');
				errorMsg.style.visibility = 'visible';
				return false;
			} else if ( phoneInput.parentElement.classList.contains('form__error-field') ) {
				phoneInput.parentElement.classList.remove('form__error-field')
			}

			$.post('../sendrecall.php', {
				phone: phoneNumber
			});
			popupRecall.classList.remove('popup-recall--visible');
			document.querySelector('.sendsuccess').classList.add('sendsuccess--visible');
		}

		popupRecallBtn.onclick = sendRecall;

		popupRecallBtnClose.addEventListener('click', () => {
			popupRecall.classList.remove('popup-recall--visible');
		})
	})();

	(function sendsuccess() {
		const sendsuccess = document.querySelector('.sendsuccess');
		const sendsuccessBtnClose = document.querySelector('.sendsuccess__btn-close');

		sendsuccessBtnClose.addEventListener('click', () => {
			sendsuccess.classList.remove('sendsuccess--visible');
		})
	})();

	function showSendSuccess(form) {
		if ( !form.closest('.form-section') ) {
			document.body.classList.remove('blocked');
			form.closest('.popup-form').style.display = 'none';
			form.closest('.popup-wrap').style.display = 'none';
		}
		document.querySelector('.sendsuccess').classList.add('sendsuccess--visible');
	}
};


