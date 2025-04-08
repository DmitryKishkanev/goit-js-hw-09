import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../../css/gallery.css';
import images from './gallery-items';

// Находим ненумерованный список галереи
const galleryContainer = document.querySelector('.gallery');

// Присваиваем переменной вызов функции рендера изображений
const galleryMarkup = createGalleryItemsMarkup(images);

// Добавляем в конец галереи все изображения
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

// Функция рендера изображений
function createGalleryItemsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      loading="lazy"
      class="gallery-image lazyload"
      data-src="${preview}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

//Создание экземпляра модельного окна SimpleLightbox с дополнительными настройками
new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

// Кроссбраузерная отложенная загрузка изображений
if ('loading' in HTMLImageElement.prototype) {
  // Браузер поддерживает lazyload
  addSrcAttrSizesScript();
} else {
  // Браузер НЕ поддерживает lazyload
  addLazySizesScript();
}

// Функция добавления изображению src атрибута
function addSrcAttrSizesScript() {
  const lazyImg = document.querySelectorAll('img[loading="lazy"]');

  lazyImg.forEach(img => {
    img.src = img.dataset.src;
  });
}

// Функция добавления скрипта библиотеки LazySizes
function addLazySizesScript() {
  const script = document.createElement('script');
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  script.integrity =
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  script.crossOrigin = 'anonymous';
  script.referrerPolicy = 'no-referrer';

  document.body.appendChild(script);
}

// Добавление анимации
const lazyImages = document.querySelectorAll('img[data-src]');

// ЕДИНОРАЗОВО ({ once: true }) добавляем слушатель события на каждый элемент галереи после его загрузки (событие "load")
lazyImages.forEach(image => {
  image.addEventListener('load', onImageLoaded, { once: true });
});

// Функция - обработчик события - добавить анимационный класс
function onImageLoaded(evt) {
  evt.target.classList.add('appear');
}
