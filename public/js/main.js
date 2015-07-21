$(function () {

  $('.email').val('');
  $(document).on('click', '.cta', function (e) {
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
  if (validateEmail(email)) {
    sendEmail(email);
  } else {
    $('.error').addClass('animated fadeInDown').text('Enter valid email');
  }
}

function sendEmail(email) {
  $('.cta').val('processing...');


  var post_data = {
    'user_email': email
  };

  $.post('/process_email', post_data, function (response) {

    if (response.message !== 'Signup failed') {

      $('.email-section').find('form').remove();

      $('.email-section').html(
        '<div class="animated fadeInDown success">We received your request. Thank you!</div>'
      );

    } else {
      document.querySelector('.error').innerHTML =
        'An error occured. Please try again later.';
      $('.cta').val('Request an invite');
    }

  });
}