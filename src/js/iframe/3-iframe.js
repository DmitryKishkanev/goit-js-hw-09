import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import '../../css/iframe.css';

const iframe = document.querySelector('iframe');

const STORAGE_KEY = 'videoplayer-current-time';

const player = new Player(iframe);
player.on('timeupdate', throttle(onPlay, 1000));

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
