(function(){
  var form = document.querySelector('.review-form'),
      sendForm = form.querySelector('.button--send-form'),
      popupError = form.querySelector('.popup--error'),
      popupSuccess = form.querySelector('.popup--success'),
      closePopup = form.querySelectorAll('.button--popup-close');


  function showCover() {
    var coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';
    document.body.appendChild(coverDiv);
  };

  function hideCover() {
    document.body.removeChild(document.getElementById('cover-div'));
  };


  sendForm.addEventListener('click', validate);

  function validate(evt) {
    evt.preventDefault();

    var inputs = form.querySelectorAll('[data-error]');

    clear(inputs, function() {
      checkIsEmpty(inputs);
    });

    function checkIsEmpty(inputs) {
      var isEmpty = false;

      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        var pattern = input.getAttribute('pattern');

        pattern = new RegExp(pattern);

        if(pattern.test(input.value) !== true) {
            //evt.preventDefault();
            isEmpty = true;
            markInput(input);
            showCover();
            popupError.classList.add('popup--show');
            return false;
        }
      }
      showCover();
      popupSuccess.classList.add('popup--show');
    }

    function markInput(input) {
      input.classList.add('error');
      var text = input.getAttribute('data-error');

      if (!text) return;

      var div = document.createElement('div');

      div.textContent = text;
      div.className = 'error-text';
      input.parentNode.appendChild(div);
    }

    function clear(inputsItem, callback) {
      for (var i = 0; i < inputsItem.length; i++) {
        var input = inputsItem[i];
        var parent = input.parentNode;
        var message = parent.querySelector('.error-text');

        input.classList.remove('error');
        if(message) parent.removeChild(message);
      }

      if(callback) callback();
    }
  }

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (popupError.classList.contains('popup--show') || popupSuccess.classList.contains('popup--show')) {
        evt.preventDefault();
        hideCover();
        popupError.classList.remove('popup--show');
        popupSuccess.classList.remove('popup--show');
      }
    }
  });

  for (var i = 0; i < closePopup.length; i++) {
    closePopup[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      hideCover();
      popupError.classList.remove('popup--show');
      popupSuccess.classList.remove('popup--show');
    });
  };
}());