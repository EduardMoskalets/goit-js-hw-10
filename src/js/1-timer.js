import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

// =====================================пробная версия 1 ============================================
// const refs = {
//     startBtn: document.querySelector('[data-start]'),
//     clockfacedays: document.querySelector('[data-days]'),
//     clockfacehour: document.querySelector('[data-hours]'),
//     clockfacedaysminutes: document.querySelector('[data-minutes]'),
//     clockfacedayssecond: document.querySelector('[data-seconds]'),
// }

// let intervalId;

// refs.startBtn.addEventListener('click', () => {
    // refs.startBtn.disabled = true;
  
//     const initTime = Date.now(); // с инпута взять значение

//     intervalId = setInterval(() => {
//         const currentTime = Date.now();
//         const diff = currentTime - initTime;
//         const time = convertMs(diff);
//         const str = getTime(time);

//         refs.clockface.textContent = str;
//     }, 1000)

//     setTimeout(() => {
//     clearInterval(intervalId);
//     }, initTime - Date.now() - 1000);
    

// });

// =====================================================================================

// function convertMs(ms) {
  // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

  // Remaining days
//   const days = Math.floor(ms / day);
  // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function getTime(d, h, m, s) {
//     d = toString();
//     h = toString();
//     m = toString();
//     s = toString();

//     return `${d} ${d} ${m} ${s}`
// }


// =============================================Вариант 2=========================================================================

let userSelectedDate = null;
    const startButton = document.querySelector('[data-start]');
    const daysSpan = document.querySelector('[data-days]');
    const hoursSpan = document.querySelector('[data-hours]');
    const minutesSpan = document.querySelector('[data-minutes]');
    const secondsSpan = document.querySelector('[data-seconds]');
let countdownInterval;
    

//  необходимо выбрать дату 
flatpickr("#datetime-picker", {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose: function(selectedDates) {
const selectedDate = selectedDates[0];
const currentDate = new Date();
                
    if (selectedDate <= currentDate) {
        iziToast.error({
            title: 'Error',
                message: 'Please choose a date in the future',
    });
        startButton.disabled = true;
    } else {
    userSelectedDate = selectedDate;
    startButton.disabled = false;
    }
}
});


//  обработчик для кнопки Старт Важно сделать не активной после нажатия 
startButton.addEventListener('click', function() {
startButton.disabled = true;
    if (userSelectedDate) {
    startCountdown(userSelectedDate);
    }
});


//  необходим расчет от какой даты до конечной 
function startCountdown(endDate) {
clearInterval(countdownInterval);
countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = endDate - now;

if (distance <= 0) {
    clearInterval(countdownInterval);
        updateTimer(0, 0, 0, 0);
} else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateTimer(days, hours, minutes, seconds);
}
    }, 1000);
}

//  необходимо выводить значение остатка
function updateTimer(days, hours, minutes, seconds) {
    daysSpan.textContent = formatTime(days);
    hoursSpan.textContent = formatTime(hours);
    minutesSpan.textContent = formatTime(minutes);
    secondsSpan.textContent = formatTime(seconds);
}

//  обновлять в числа где нет 2-х чисел 0
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
