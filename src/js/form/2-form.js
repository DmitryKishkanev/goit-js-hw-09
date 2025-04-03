// Получем в переменную нашу форму из HTML
const formEl = document.querySelector('.feedback-form');

// Создаём объект с пустыми свойствами для записи данных и сохранения его в localStorage
const formData = {
  email: '',
  message: '',
};

// Слушатель события ввода данных
formEl.addEventListener('input', onInput);
// Слушатель события отправки данных
formEl.addEventListener('submit', onFormSubmit);

// Вызов функции записи данных в форму из localStorage и передача ему аргументом нашей формы
populateForm(formEl);

// Функция обработчика слушателя события ввода данных (по методу делегирования)
function onInput(evt) {
  // formData.email = formEl.elements.email.value.trim(); // Обращение к элементу формы напрямую
  // formData.message = formEl.elements.message.value.trim(); // Обращение к элементу формы напрямую
  const formElements = evt.currentTarget.elements;
  formData.email = formElements.email.value.trim();
  formData.message = formElements.message.value.trim();

  if (formData.email !== '' || formData.message !== '') {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } else {
    localStorage.removeItem('feedback-form-state');
    return;
  }
}

// Функция обработчика слушателя события отправки данных (по методу делегирования)
function onFormSubmit(evt) {
  evt.preventDefault();

  const formElements = evt.currentTarget.elements;
  if (
    formElements.email.value.trim() === '' ||
    formElements.message.value.trim() === ''
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

// Функция записи данных в форму из localStorage
function populateForm(form) {
  const formElements = form.elements;
  const savedForm = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedForm) {
    formData.email = savedForm.email;
    formData.message = savedForm.message;

    formElements.email.value = formData.email;
    formElements.message.value = formData.message;
  }
}
