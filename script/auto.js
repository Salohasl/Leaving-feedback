import autoArrays from './catalog.js';
const autoWrapper = document.querySelector('.auto-wrapper');
const title = document.querySelector('title');
const swiperSlides = document.querySelectorAll('.swiper-slide')
const autoArray = autoArrays;

let currentIndex = 0; // Переменная для отслеживания текущего индекса изображения
let intervalId = null; // Переменная для хранения идентификатора интервала

function loadingAuto(){
    for(const auto of autoArray){

        let autoItem = document.createElement('div');
        autoItem.classList.add('auto-item');

        const src = auto.src.map((img, index) => {
            // Находим соответствующий слайд по индексу
            const slideIndex = index % swiperSlides.length; // Используем остаток от деления, чтобы избежать выхода за пределы массива swiperSlides
            const slideElement = swiperSlides[slideIndex];
            slideElement.innerHTML = `<img src="${img}" alt="Image ${index + 1}">`;
        });

            //`<img src="${img}" alt="Auto ${index}">`
        console.log(src)
        //создаем img

        autoItem.innerHTML = `
            <h2>${auto.name}</h2>
            <p>Професиональный водитель</p>
            <p>Детям до 7 лет скидка 50 %</p>
            <p>Детские кресла бустэры</p>
            <a href="/feedback/index.html"><button value="${title.textContent}" data-car="${auto.name}" class="auto-button">Заказать</button></a>
        `;

        autoWrapper.append(autoItem);

         // Запускаем интервал для автоматической смены изображений
         intervalId = setInterval(() => {
            changeImage(auto.src[currentIndex]);
            currentIndex = (currentIndex + 1) % auto.src.length; // Переходим к следующему изображению или возвращаемся к первому
        }, 3000); // Изменяем изображение каждые 3 секунды

        const button = document.querySelector('.auto-button')
        const obj = {
            auto: button.dataset.car,
            transfer: button.value
        }
        button.addEventListener('click', ()=>{
            localStorage.setItem('transfer', JSON.stringify(obj));
        })
    }
    
}
// Функция для смены изображения
function changeImage(newSrc) {
    const imageElements = document.querySelectorAll('.auto-item img');
    imageElements.forEach(image => {
        image.src = newSrc;
    });
}
loadingAuto();
// Очистка интервала при закрытии страницы
window.addEventListener('beforeunload', () => {
    clearInterval(intervalId);
});