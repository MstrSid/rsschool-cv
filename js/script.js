/* hamburger menu start */
const hamburger = document.querySelector('.hamburger'),
	menu = document.querySelector('.menu'),
	closeElem = document.querySelector('.menu__close');
	overlay = document.querySelector('.menu__overlay');


hamburger.addEventListener('click', () => {
	menu.classList.add('active');
});

overlay.addEventListener('click', () => {
	menu.classList.remove('active');
});

closeElem.addEventListener('click', () => {
	menu.classList.remove('active');
});
/* hamburger menu end */

/* percentage width start */
const percents = document.querySelectorAll(".percents__item-number"),
	targetSpans = document.querySelectorAll(".percents__item-background span");

percents.forEach((item, i) => {
	targetSpans[i].style.width = item.innerHTML;
})
/* percentage width end */

$(document).ready(function () {
	function validateForm(form) {
		$(form).validate({
			errorElement: 'div',
			errorClass: 'errMsg',
			rules: {
				name: {
					required: true,
					minlength: 2,
					lettersonly: true
				},
				email: {
					required: true,
					email: true
				},
				text: {
					required: true
				},
				policy: {
					required: true
				}
			},

			messages: {
				name: {
					required: "Введите имя",
					lettersonly: "Только буквы",
					minlength: jQuery.validator.format("Не менее {0} символов"),
				},
				email: {
					required: "Введите свой email",
					email: "Неверный формат"
				},

				text: {
					required: "Введите текст сообщения",
					minlength: jQuery.validator.format("Не менее {0} символов"),
				},

				policy: {
					required: "Примите условия политики конфиденциальности",
				}
			},
		});
	}

	function resetInput(form) {
		$('.modal__close').on('click', function () {
			var f = $(form);
			f.validate().resetForm(); // clear out the validation errors
			f[0].reset(); // clear out the form data
		});
	}

	validateForm('.contacts__form');
	resetInput('.contacts__form');



	/* mailer start*/

	$('.modal__close').on('click', function () {
		$('.overlay, #thankyou').fadeOut();
	});

	$('form').submit(function (e) {
		e.preventDefault();
		if (!$(this).valid()) {
			return;
		}
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find('input').val('');
			$(this).find('textarea').val('');
			$(this).find('#policy').prop("checked", false);
			$('.overlay, #thankyou').fadeIn();
			$('form').trigger('reset');
		});
		return false;
	});
	/* mailer end */

	/* smooth scroll start*/
	$('nav a, .promo__buttons a').on('click', function (e) {
		if (this.hash !== '') {
			e.preventDefault();
			const hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top +100
			}, 800);
		}
	});
	/* smooth scroll end*/
	new WOW().init();
});

jQuery.validator.addMethod("lettersonly", function (value, element) {
	return this.optional(element) || /^[a-zа-я\s]+$/i.test(value);
}, "Only alphabetical characters");