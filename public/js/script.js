//TODO: Failed Login Div Box
function login(email, pw) {
  $.ajax({
    url: '/sign-in',
    method: 'POST',
    data: { email: email, pw: pw },
    success: document.location.replace('/'),
    error: console.log(error, 'error'),
    dataType: json,
  });
}

function signup(name, email, password) {
  $.ajax({
    url: '/sign-up',
    method: 'POST',
    data: { name: name, email: email, password: password },
    success: document.location.replace('/'),
    error: console.log(error, 'error'),
    dataType: json,
  });
}

$('#signIn').on('click', function (event) {
  event.preventDefault();
  login($('#email').val(), $('#pw').val());
});

$('#createAccount').on('click', function (event) {
  event.preventDefault();
  signup($('#id').val(), $('#email').val(), $('#pw').val());
});
