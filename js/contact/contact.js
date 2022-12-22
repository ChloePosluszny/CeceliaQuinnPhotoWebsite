class User {
  constructor(name, email, comments) {
  this.name = name;
  this.email = email;
  this.comments = comments;
  }
 }

var fields = {};

var form_id_js = document.getElementById("cform");

var sendButton = document.getElementById("submitBttn");

var data_js = {
  "access_token": "lww8wu535egbllkuo0dl2zuq"
};

document.addEventListener("DOMContentLoaded", function() {
  fields.name = document.getElementById('name');
  fields.email = document.getElementById('email');
  fields.comments = document.getElementById('comments');
})

// function isNotEmpty(value) {
//  if (value == null || typeof value == 'undefined' ) return false;
//  return (value.length > 0);
// }

// function isEmail(email) {
//   let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//   return regex.test(String(email).toLowerCase());
// }

// function fieldValidation(field, validationFunction) {
//   if (field == null) return false;
 
//   let isFieldValid = validationFunction(field.value)
//   if (!isFieldValid) {
//   field.className = 'placeholderRed';
//   } else {
//   field.className = '';
//   }
 
//   return isFieldValid;
//  }

//  function isValid() {
//   var valid = true;
  
//   valid &= fieldValidation(fields.name, isNotEmpty);
//   valid &= fieldValidation(fields.email, isEmail);
 
//   return valid;
//  }

 function js_onSuccess() {
  // remove this to avoid redirect
  window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
  sendButton.value='Sent.'
}

function js_onError(error) {
  // remove this to avoid redirect
  window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
  sendButton.value='Error During Submission...'
  return false;
}

function js_send() {
  sendButton.value='Submitting…';
  sendButton.disabled=true;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if ((request.readyState == 4 && request.status == 200) && (document.getElementById('name') != null && document.getElementById('email') != null)) {
          js_onSuccess();
      } else
      if(request.readyState == 4 || document.getElementById('name') == null || document.getElementById('email') == null) {
          return js_onError(request.response);
      }
  };

  var subject = document.querySelector("input[name='email']").value; //email
  var message = document.querySelector("input[name='name']").value; //name
  var comments = "Nothing Inputted";
  
  if (document.querySelector("textarea[name='comments']").value != null) {
    comments = document.querySelector("textarea[name='comments']").value //comments 
  }

  data_js['subject'] = subject;
  data_js['text'] = message + ": " + comments;

  var params = toParams(data_js);

  request.open("POST", "https://postmail.invotes.com/send", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.send(params);

  return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
  var form_data = [];
  for ( var key in data_js ) {
      form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
  }

  return form_data.join("&");
}

var js_form = document.getElementById(cform);
if(js_form){
    js_form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
}

/*
function sendContact() {
  if (isValid()) {
    let usr = new User(fields.name.value, fields.email.value, fields.comments.value);
    alert(`${usr.name}: contact info sent!`)
  } else {
    alert('An Error Occurred: Try completing required fields!')
  }
}
*/