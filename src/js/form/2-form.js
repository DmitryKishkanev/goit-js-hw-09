import throttle from 'lodash.throttle';
import '../../css/form.css';

// Получем в переменную нашу форму из HTML
const formEl = document.querySelector('.feedback-form');

// Переменная для хранения localStorage ключа
const STORAGE_KEY = 'feedback-form-state';

// Создаём объект с пустыми свойствами для записи данных и сохранения его в localStorage
const formData = {
  email: '',
  message: '',
};

// Слушатель события ввода данных и throttle (функия выполняется один раз в указанный промежкток времени)
formEl.addEventListener('input', throttle(onInput, 500));
// Слушатель события отправки данных
formEl.addEventListener('submit', onFormSubmit);

// Вызов функции записи данных в форму из localStorage и передача ему аргументом нашей формы
populateForm(formEl);

// Функция обработчика слушателя события ввода данных (по методу делегирования)
function onInput(evt) {
  // formData.email = formEl.elements.email.value.trim(); // Обращение к элементу формы напрямую
  // formData.message = formEl.elements.message.value.trim(); // Обращение к элементу формы напрямую

  const { name, value } = evt.target;
  formData[name] = value.trim();

  // Проверяем, есть ли хотябы одно поле, значение которого не пустое
  const hasData = Object.values(formData).some(field => field !== '');

  if (hasData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } else {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
}

// Вызов функции записи данных в форму из localStorage и передача ему аргументом нашей формы
populateForm(formEl);

// Функция обработчика слушателя события отправки данных (по методу делегирования)
function onFormSubmit(evt) {
  evt.preventDefault();

  const { email, message } = formData;
  if (!email || !message) {
    window.alert('Fill please all fields');
    return;
  }
  const formDataSnapshot = { ...formData };
  console.log(formDataSnapshot);

  // Очистка данных
  localStorage.removeItem(STORAGE_KEY);
  formEl.reset();
  formData.email = '';
  formData.message = '';
}

// Функция записи данных в форму из localStorage
function populateForm(form) {
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedForm) {
    Object.keys(savedForm).forEach(key => {
      if (form.elements[key]) {
        form.elements[key].value = savedForm[key];
        formData[key] = savedForm[key];
      }
    });
  }
}
