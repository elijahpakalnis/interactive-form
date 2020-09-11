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


