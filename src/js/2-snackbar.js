import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

//  необходимо найти селектор добавить слушателя 
document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();

// Получаем значения и состояние 
    const delay = Number(event.target.elements.delay.value);
    const state = event.target.elements.state.value;

//  создаем Промисс и неоьходима проверка 
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

// Обработка результата промисса при помощи библиотеки ( необходимо чтоб выводилось уведомление )
    promise
        .then((result) => {
            iziToast.success({
                title: 'Success',
                message: `Fulfilled promise in ${result}ms`
            });
    })
        .catch((error) => {
            iziToast.error({
                title: 'Error',
                message: `Rejected promise in ${error}ms`,
            });
        });
});