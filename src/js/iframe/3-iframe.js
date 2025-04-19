import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import '../../css/iframe.css';

// Получем в переменную наш vimeo-player из HTML
const iframe = document.querySelector('#vimeo-player');

// Переменная для хранения localStorage ключа
const STORAGE_KEY = 'videoplayer-current-time';

//Инициализируем плеер, как описано в библиотеке Vimeo
const player = new Player(iframe);
// С помощью метода on() отслеживаем событие timeupdate. Throttle - ограничивает время обновляется - раз в секунду
player.on('timeupdate', throttle(onPlay, 1000));

// Функция обработчика слушателя события обновления времени
function onPlay(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

const timeStop = localStorage.getItem(STORAGE_KEY);

if (timeStop) {
  player.setCurrentTime(parseFloat(timeStop)).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.warn(
          'Указанное время воспроизведения находится вне диапазона доступной длительности видео.'
        );
        break;

      default:
        console.error('Произошла ошибка:', error);
        break;
    }
  });
}
