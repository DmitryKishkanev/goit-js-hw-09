import images from './gallery-items';

// Находим ненумерованный список галереи
const galleryContainer = document.querySelector('.gallery');

// Присваиваем переменной вызов функции рендера изображений
const galleryMarkup = createGalleryItemsMarkup(images);

// Добавляем в конец галереи все изображения
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

// Добавляем на галерею слушатель события
galleryContainer.addEventListener('click', onGalleryContainerClick);

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
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

// Функция делегирования событий
function onGalleryContainerClick(evt) {
  evt.preventDefault();

  const imageEl = evt.target;

  if (!imageEl.classList.contains('gallery-image')) {
    return;
  }

  createModal(imageEl.dataset.source);
}

// Функция создания модельного окна c опциями и метод - открыть
function createModal(element) {
  const instance = basicLightbox.create(
    `
     <div class="modal-backdrop">
      <img src="${element}" style="width: 1112px" />
    </div>
`,
    {
      handler: null,
      onShow(instance) {
        this.handler = closeModal.bind(instance);
        document.addEventListener('keydown', this.handler);

        closeModalOnClickBackdrop(instance);
        bodyAddClassScroll();
      },

      onClose() {
        document.removeEventListener('keydown', this.handler);
        bodyRemoveClassScroll();
      },
    }
  );

  instance.show();
}

// Функция добавления на body класса выключения Scroll
function bodyAddClassScroll() {
  document.body.classList.add('no-scroll');
}

// Функция снятия c body класса выключения Scroll
function bodyRemoveClassScroll() {
  document.body.classList.remove('no-scroll');
}

// Функцмя закрытие модельного окна при клике на backdrop
function closeModalOnClickBackdrop(instance) {
  const backdrop = instance.element().querySelector('.modal-backdrop');
  backdrop.addEventListener('click', evt => {
    if (evt.target === backdrop) {
      instance.close();
    }
  });
}

// Функция закрытия модельного окна
function closeModal(evt) {
  if (evt.code === 'Escape') {
    this.close();
  }
}

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
