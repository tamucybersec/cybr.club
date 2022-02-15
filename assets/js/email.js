// https://aws.amazon.com/blogs/architecture/create-dynamic-contact-forms-for-s3-static-websites-using-aws-lambda-amazon-api-gateway-and-amazon-ses/
function submitToAPI(e) {
  e.preventDefault();

  var $contactForm = $('#contact-form');
  
  // use html5 validation for input fields
  if(!$contactForm[0].checkValidity()) {
    $('#handle-submit').click();
    return;
  }

  let name = $('#name').val();
  let email = $('#email').val().toLowerCase();
  let msg = $('#msg').val();

  var data = {
    name : name,
    email : email,
    msg : msg,
    page : page
  };

  $.ajax({
    type: 'POST',
    url : API_HOME_EMAIL,
    dataType: 'json',
    crossDomain: 'true',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(data),
    
    // using sweet alerts for messages
    success: function () {
      swal('Sent Successfully!', 'Your message will be reviewed by our team', 'success').then(function(){
      document.getElementById('contact-form').reset();
      window.location.reload();
      });
    },
    error: function () {
    swal('Error Sending Message!', `Please contact ${email_address} directly`, 'error');
    return;
  }});
}