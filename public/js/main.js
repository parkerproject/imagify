$(function() {

  $('.email').val('');
  $(document).on('click', '.cta', function(e) {
    e.preventDefault();
    checkEmail();
  });

});

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


function checkEmail() {
  var email = document.querySelector('.email').value;
  var name = document.querySelector('.name').value;

  if (!validateEmail(email)) {
    $('.error').text('Enter valid email');
  }

  if (name === '') {
    $('.error').text('Enter name');
  }



  if (validateEmail(email) && name !== '') {
    sendEmail(email, name);
  }
}

function sendEmail(email, name) {
  $('.cta').text('processing...');


  var post_data = {
    'user_email': email,
    'name': name
  };

  $.post('/process_email', post_data, function(response) {

    if (response.status !== 'failed') {

      $('.modal-content').find('form').remove();

      $('.modal-content').html(
        '<div class="primary-text-color text-center">' + response.status + '</div>'
      );

    } else {
      document.querySelector('.error').innerHTML =
        'An error occured. Please try again later.';
      $('.cta').val('Signup');
    }

  });
}