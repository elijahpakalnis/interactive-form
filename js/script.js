// focus on first input field on page load
const nameField = document.getElementById('name');
nameField.focus();

// == Job Role ==
// get reference to other-title input field and hide it
const otherJobTitle = document.getElementById('other-title');
otherJobTitle.hidden = true; 
// get reference to title select element & listen for change event
const titleField = document.getElementById('title');
titleField.addEventListener('change', e => {
  // if other then display input for user job title, otherwise ensure it's hidden
  otherJobTitle.hidden = e.target.value === 'other' ? false : true;
});

// == T-Shirt Info ==
// get reference to shirt-colors div and shirtcolor select options
const shirtColorsDiv = document.getElementById('shirt-colors');
const shirtColorsList = document.querySelectorAll('#color option');

// remove (JS Puns shirt only) & (I ♥ JS shirt only) from options
shirtColorsList.forEach(color => color.textContent = color.textContent.replace(/\(.+\)/, ''));
// hide shirtColorsDiv initially
shirtColorsDiv.hidden = true;

//get reference to design select element
const designSelectElement = document.getElementById('design');

// onchange event listener for the design select element
designSelectElement.addEventListener('change', (e) => {
  const option = e.target.value;

  switch(option) {
    case 'js puns': 
      displayAvailableColors(/Cornflower Blue|Dark Slate Grey|Gold/);
      break;
    case 'heart js':
      displayAvailableColors(/Tomato|Steel Blue|Dim Grey/);
      break;
    default:
      shirtColorsDiv.hidden = true;
  }
});

// function to display available colors for design option
const displayAvailableColors = option => {
  // initially hide all color options
  shirtColorsList.forEach(color => color.hidden = true);
  // ensure shirtColorsDiv is no longer hidden
  shirtColorsDiv.hidden = false;

  let firstMatchFound = false;
  for(let i = 0; i < shirtColorsList.length; i++) {
    // check if option matches color
    if(option.test(shirtColorsList[i].textContent)){
      shirtColorsList[i].hidden = false; //display the color option
      // check for first match and set it to selected state
      if(!firstMatchFound) {
        shirtColorsList[i].selected = true;
        firstMatchFound = true;
      }
    }
  }
}

// == Register For Activities Section ==
const activities = document.querySelector('.activities');
const activityList = document.querySelectorAll('.activities input');
  
// label for total running cost for activities
const totalAmountLabel = document.createElement('label');
activities.appendChild(totalAmountLabel);

// activities change event listener
activities.addEventListener('change', (e) => {

  const checkedActivity = e.target;
  const checkedActivityTimetable = checkedActivity.getAttribute('data-day-and-time');

  // variable for total running cost
  let totalCost = 0;

  // nested function to set activity availability
  const setActivityAvailability = (activity, activityTimetable, setAvailability) => {
    if(checkedActivityTimetable === activityTimetable 
      && checkedActivity !== activity ){
        // set & indicate to user whether activity is availabile
        activity.disabled = setAvailability; 
        activity.parentNode.style.textDecoration = setAvailability ? 'line-through' : 'none';
      }
  }
  
  // loop through each activity
  for(let i = 0; i < activityList.length; i++) {
    let activityTimetable = activityList[i].getAttribute('data-day-and-time');
   
    if(checkedActivity.checked) {
      setActivityAvailability(activityList[i], activityTimetable, true);
    }else{
      setActivityAvailability(activityList[i], activityTimetable, false);
    }
    
    // update total price of selected activities
    if(activityList[i].checked) totalCost += parseInt(activityList[i].getAttribute('data-cost'));
  }
  // display total price
    totalAmountLabel.textContent = totalCost > 0 ? `Total price: $${totalCost}` : '';
});

// == Payment Info Section ==
// references for payment section
const paymentSection = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

// select credit card as default option 
const creditCardOption = document.querySelector('option[value="credit card');
creditCardOption.selected = true;
// disable select payment method option
const selectPaymentMethodOption = document.querySelector('option[value="select method"');
selectPaymentMethodOption.disabled = true;

// hide the paypal and bitcoin payment info
paypalDiv.hidden = true;
bitcoinDiv.hidden = true;

// change event listener on the paymentSection
paymentSection.addEventListener('change', (e) => {
  let option = e.target.value;
  
  // nested function to display selected payment option
  const selectPaymentOption = (payment) => {
    const paymentOptions = [creditCardDiv, paypalDiv, bitcoinDiv];
    for(let i = 0; i < paymentOptions.length; i++) {
      const payment = paymentOptions[i].getAttribute('id');
      if(option === 'credit card') option = 'credit-card'; //rename so it matches id
      // set hidden state to divs depending whether option matches payment
      paymentOptions[i].hidden = option === payment ? false : true;
    }
  }
  selectPaymentOption(option);
});

// == Form Validation ==
// references for validation
const emailField = document.getElementById('mail');
const creditCardNumber = document.getElementById('cc-num');
const zipcode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');

// == Form Validation Functions ==
// function to validate name field isn't blank
const validateName = (input) =>{
  return /\w+/.test(input);
}

// function to validate correctly formatted e-mail address
const validateEmail = (input) => {
  const emailRegex = /^[^@]+@+[^.@]+\.\w+$/m;
  return emailRegex.test(input);
}

// function to validate atleast one register activity checked
const validateActivityRegistration = () => {
  let registeredCount = 0;
  activityList.forEach(activity => activity.checked ? registeredCount++ : '');
  return registeredCount >= 1;
}

// function to validate credit card number, accept between 13 and 16 digits
const validateCreditCardNumber = (input) => {
  const creditCardRegex = /^\d{13,16}$/m;
  return creditCardRegex.test(input);
}

// function to validate zip code exactly 5 digits long
const validateZipCode = (input) => {
  const zipCodeRegex = /^\d{5}$/;
  return zipCodeRegex.test(input);
}

// function to validate CVV exactly 3 digits long
const validateCVV = (input) => {
  const cvvRegex = /^\d{3}$/;
  return cvvRegex.test(input);
}

// function to validate user entered data
const validateInfoRegistration = () => {
  if(validateName(nameField.value)
  && validateEmail(emailField.value)
  && validateActivityRegistration()) 
    return true;
}

// function to validate credit card data
const validateCreditCard = () => {
  if(validateCreditCardNumber(creditCardNumber.value)
  && validateZipCode(zipcode.value)
  && validateCVV(cvv.value)) 
    return true;
}

//function to validate user entered info
const validateSubmittedData = () => {
  // validate name, mail, activity
  const validInfo = validateInfoRegistration();
  // if credit card option selected
  if(creditCardOption.selected){
    // validate credit card too, and return result of both
    const validCreditCard = validateCreditCard();
    return validInfo && validCreditCard;
  }
  // otherwise just return main details
  return validInfo;
}

// function to validate user input 
const validate = (validator, inputReference) => {
  const input = inputReference.value;
  const valid = validator(input);
  const inputID = inputReference.getAttribute('id');
  const validateMessage = document.getElementById(`form-${inputID}-error`);

  if(!valid) {
    validateMessage.style.display = 'block';
    inputReference.style.borderColor = 'red';
    // conditional credit card error message
    if(inputID === 'cc-num' && input.length > 0 ) {
      validateMessage.textContent = 'Please enter a number that is between 13 and 16 digits long';
    }else if(inputID === 'cc-num' && input.length === 0) {
      validateMessage.textContent = 'Please enter a valid credit card number';
    }
  } else {
    validateMessage.style.display = 'none';
    inputReference.style.borderColor = '#1db954';
  }
}

// function to run all validators for the form
const activitiesValidationMessage = document.getElementById('form-activities-error');
const validateEverything = () => {
  activitiesValidationMessage.style.display = validateActivityRegistration() ? 'none' : 'block';
  validate(validateName, nameField);
  validate(validateEmail, emailField);
  if(creditCardOption.selected) {
    validate(validateCreditCardNumber,creditCardNumber);
    validate(validateZipCode, zipcode);
    validate(validateCVV, cvv);
  }
}

// == Form Validation Event Listeners ==
const createListener = (validator) => {
  return e => {
    validate(validator, e.target);
  }
}

// form input event listeners
nameField.addEventListener('input', createListener(validateName));
emailField.addEventListener('input', createListener(validateEmail));
creditCardNumber.addEventListener('input', createListener(validateCreditCardNumber));
zipcode.addEventListener('input', createListener(validateZipCode));
cvv.addEventListener('input', createListener(validateCVV));

// activities event listener
activities.addEventListener('change', (e) => {
  // validates it and either displays the error message or hides it
  activitiesValidationMessage.style.display = validateActivityRegistration() ? 'none' : 'block';
});

// submit event listener for button for the form
form.addEventListener('submit', (e) => {
  // if submitted data not valid prevent submittion and validate everything to view validation messages
  if(!validateSubmittedData()) {
    e.preventDefault();
    validateEverything();
  }
});