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
  if(e.target.value === 'other') {
    otherJobTitle.hidden = false;
  }else {
    otherJobTitle.hidden = true;
  }
});

// == T-Shirt Info ==
// get reference to shirtcolor select options and select theme option from design select
const shirtColors = document.querySelectorAll('#color option');
const selectThemeOption = document.querySelector('option[value="select theme"]');

// initial select theme option should hide all colors
if(selectThemeOption.selected) {
  // hide all colors and leave out default option
  shirtColors.forEach(color => {
    if(!/Please select/.test(color.textContent)) 
      color.hidden = true;
  });
}

//get reference to design select element
const designSelectElement = document.getElementById('design');

// onchange event listener for the design select element
designSelectElement.addEventListener('change', (e) => {
  const option = e.target.value;
  
  switch(option) {
    case 'js puns': 
      displayAvailableColors(/JS Puns/);
      break;
    case 'heart js':
      displayAvailableColors(/I ♥ JS/);
      break;
    default:
      displayAvailableColors(/Please select/);
  }
});

// function to display available colors for design option
const displayAvailableColors = option => {
  // initially hide all color options
  shirtColors.forEach(color => color.hidden = true);

  let firstMatchFound = false;
  for(let i = 0; i < shirtColors.length; i++) {
    // check if option matches color
    if(option.test(shirtColors[i].textContent)){
      shirtColors[i].hidden = false; //display the color option
      // check for first match and set it to selected state
      if(!firstMatchFound) {
        shirtColors[i].selected = true;
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
  totalAmountLabel.textContent = `Total price: $${totalCost}`;
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

// == Form Validation Event Listeners ==
// submit button for form
form.addEventListener('submit', (e) => {
  if(creditCardOption.selected) {
    // validate user enterered info & credit card
    if(!validateInfoRegistration() && !validateCreditCard()) {
      e.preventDefault();
    }
  }else {
    // validate user entered info only
    if(!validateInfoRegistration()) {
      e.preventDefault();
    }
  }
});

