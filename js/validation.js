// form validation
const form = document.getElementById('my-form');
const appType = document.getElementsByName('appointmentType');
const fName = document.getElementById('fname');
const lName = document.getElementById('lname');
const mobile = document.getElementById('mobile');
const email = document.getElementById('email');
const date = document.getElementById('date');
const time = document.getElementById('time');
const spanRadio = document.getElementById('radio-error');
const agreed = document.getElementById('agreement');
const spanCheck = document.getElementById('check-error');

const url = 'http://localhost:5000/api/v1/contacts';

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  if (validateForm()) {
    const formData = new FormData(e.target);
    const urlEncodedFormData = new URLSearchParams(formData).toString();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedFormData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
          window.location.href = '/Response.html';
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
});

function validateForm() {
  const fNameValue = fName.value.trim();
  const lNameValue = lName.value.trim();
  const mobileValue = mobile.value.trim();
  const emailValue = email.value.trim();
  const dateValue = date.value.trim();
  const timeValue = time.value.trim();
  var returnValue = true;
  const appTypeValue = radioValue(appType);
  const agreementCheck = readChecked(agreed);

  if (appTypeValue === '') {
    spanRadio.innerText = 'Appointment type is required';
    returnValue = false;
  } else {
    spanRadio.innerText = '';
  }

  if (agreementCheck === '') {
    spanCheck.innerText = 'You need to agree to our privacy policy';
    returnValue = false;
  } else {
    spanCheck.innerText = '';
  }

  if (fNameValue === '') {
    setErrorFor(fName, 'First Name is required');
    returnValue = false;
  } else {
    setSuccessFor(fName);
  }

  if (lNameValue === '') {
    setErrorFor(lName, 'Last Name is required');
    returnValue = false;
  } else {
    setSuccessFor(lName);
  }

  if (mobileValue === '') {
    setErrorFor(mobile, 'Your mobile number is required');
    returnValue = false;
  } else if (!isMobileNumber(mobileValue)) {
    setErrorFor(mobile, 'Mobile number cannot be less than 10 digits');
    returnValue = false;
  } else {
    setSuccessFor(mobile);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Your email is required');
    returnValue = false;
  } else if (!isValidEmail(emailValue)) {
    setErrorFor(email, 'The email you entered is not valid');
    returnValue = false;
  } else {
    setSuccessFor(email);
  }

  if (dateValue === '') {
    setErrorFor(date, 'Date is required');
    returnValue = false;
  } else if (!compareDate(dateValue)) {
    setErrorFor(date, 'Date cannot be less than today');
    returnValue = false;
  } else if (!checkSunday(dateValue)) {
    setErrorFor(
      date,
      'Sorry we are closed on sundays. Please choose another day.'
    );
    returnValue = false;
  } else {
    setSuccessFor(date);
  }

  if (timeValue === '') {
    setErrorFor(time, 'Time of visit is required');
    returnValue = false;
  } else {
    setSuccessFor(time);
  }

  return returnValue;
}

function radioValue(ele) {
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      return ele[i].value;
    }
  }
  return '';
}

function readChecked(ele) {
  if (ele.checked) {
    return ele.value;
  } else {
    return '';
  }
}

function setErrorFor(id, message) {
  const formControl = id.parentElement;
  const span = formControl.querySelector('.validation-error');
  span.innerText = message;
}

function setSuccessFor(id) {
  const formControl = id.parentElement;
  const span = formControl.querySelector('.validation-error');
  span.innerText = '';
}

function isMobileNumber(number) {
  const mob = /^[1-9]{1}[0-9]{9}$/;
  if (mob.test(number) == false) {
    return false;
  } else {
    return true;
  }
}

function isValidEmail(mail) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(mail) == false) {
    return false;
  } else {
    return true;
  }
}

function compareDate(inputDate) {
  var toDate = new Date();
  var year = toDate.getFullYear();
  var month = toDate.getMonth() + 1;
  var date = toDate.getDate();
  if (month < 10) {
    var month = '0' + month;
  }
  if (date < 10) {
    var date = '0' + date;
  }
  var currentDate = year + '-' + month + '-' + date;
  if (inputDate < currentDate) {
    return false;
  } else {
    return true;
  }
}

function checkSunday(inputDate) {
  var day = new Date(inputDate).getUTCDay();
  if (day === 0) {
    return false;
  } else {
    return true;
  }
}
