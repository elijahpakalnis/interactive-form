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

