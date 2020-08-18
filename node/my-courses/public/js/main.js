$(document).ready(function () {
  "use strict";

  var modalActive = false;
  var modal = $('.reg_modal');
  var btn = $('.reg_btn');
  var btnClose = $('.reg_close');

  initReg();

  function initReg() {
    if (modal.length) {
      if (btn.length) {
				btn.on('click', function (e) {
					e.preventDefault();

          if (modalActive) {
						closeReg();
          } else {
						openReg();
          }
        });

				btnClose.on('click', function (e) {
					e.preventDefault();

					closeReg();
				});
      }
    }
  }

  function openReg() {
		modal.addClass('active');
		modalActive = true;
  }

  function closeReg() {
		modal.removeClass('active');
		modalActive = false;
  }

  // Login
  const loginBtn = $('.reg_form_button');

  loginBtn.click(function(e) {
    e.preventDefault();

    const form = document.forms.formLogin;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(() => {
        window.location.reload();
      })
  });

});