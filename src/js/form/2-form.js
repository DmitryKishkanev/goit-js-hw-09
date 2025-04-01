const formEl = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

formEl.addEventListener('input', onInput);
formEl.addEventListener('submit', onFormSubmit);

populateForm();

function onInput(evt) {
  formData.email = formEl.elements.email.value.trim();
  formData.message = formEl.elements.message.value.trim();

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (
    formEl.elements.email.value.trim() === '' ||
    formEl.elements.message.value.trim() === ''
  ) {
    window.alert('Fill please all fields');
  } else {
    const formDataSnapshot = { ...formData };
    console.log(formDataSnapshot);

    formData.email = '';
    formData.message = '';
    localStorage.removeItem('feedback-form-state');
    evt.currentTarget.reset();
  }
}

function populateForm() {
  const savedForm = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedForm) {
    formEl.elements.email.value = savedForm.email;
    formEl.elements.message.value = savedForm.message;
  }
}
