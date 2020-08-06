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

});