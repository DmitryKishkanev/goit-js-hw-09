import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{P as r,t as a}from"./assets/vendor-CTb0cke2.js";const n=document.querySelector("iframe"),o=new r(n);o.on("timeupdate",a(c,1e3));function c(e){localStorage.setItem("videoplayer-current-time",e.seconds)}const t=localStorage.getItem("videoplayer-current-time");t&&o.setCurrentTime(parseFloat(t)).catch(function(e){switch(e.name){case"RangeError":console.warn("Указанное время воспроизведения находится вне диапазона доступной длительности видео.");break;default:console.error("Произошла ошибка:",e);break}});
//# sourceMappingURL=3-iframe.js.map
