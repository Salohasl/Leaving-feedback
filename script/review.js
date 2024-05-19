let comments = [];
const reviewForm = document.querySelector('.review-form');
const btn = document.getElementById('reviewShow');

document.addEventListener('DOMContentLoaded', function() {
    showComments(); // Вызываем функцию showComments при загрузке страницы
});


function showReview() {
    if (localStorage.getItem('comment')) {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'inline';
        btn.addEventListener('click', () => {
            reviewForm.classList.add('active');
        });
    }
}
showReview();
document.getElementById('close').onclick = () => {
    reviewForm.classList.remove('active');
};

document.getElementById('add-review').onclick = async (event) => {
    event.preventDefault();
    const name = document.getElementById('name');
    const commentText = document.getElementById('comment');

    // Валидация имени пользователя и текста комментария
    if (!name.value.trim() ||!commentText.value.trim()) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    if (name.value.length < 2 || commentText.value.length < 5) {
        alert('Имя должно быть не менее 2 символов, а комментарий - не менее 5 символов.');
        return;
    }

    let comment = {
        name: name.value,
        body: commentText.value,
        time: Math.floor(Date.now() / 1000),
    };

    // Создание FormData объекта
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('comment', commentText.value);
    formData.append('time', comment.time);

    try {
        const response = await fetch('http://localhost:3000/reviews', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Ошибка при отправке отзыва');
        }

        const data = await response.json();
        console.log(data.message);

       
        showComments(); // Обновляем отображение отзывов
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }

    name.value = '';
    commentText.value = '';
    reviewForm.classList.remove('active');
    btn.style.display = 'none';
};


async function showComments() {
    const reviewWrapper = document.querySelector('.review-wrapper');
    // Очищаем предыдущие отзывы
    reviewWrapper.innerHTML = ''; // Удаляем все существующие отзывы

    try {
        // Загрузка отзывов с сервера
        const response = await fetch('http://localhost:3000/reviews'); // Адрес сервера для получения отзывов
        if (!response.ok) {
            throw new Error('Ошибка при загрузке отзывов');
        }
        const data = await response.json(); // Убедитесь, что данные возвращаются в формате JSON

        // Проверка, что данные не пусты и содержат отзывы
        if (data && Array.isArray(data)) {
            // Добавление отзывов на страницу
            data.forEach(item => {
                // Проверка наличия всех необходимых полей в отзыве
                if (item.name && item.comment && item.time && item.id) {
                    reviewWrapper.innerHTML += `
                        <div class="review-item">
                            <button class="delete-review-btn" data-id="${item.id}">X</button>
                            <p>${timeConverter(item.time)}</p>
                            <div class="review-item__user">
                                <img class="imgGender" src="/img/ava.png" alt="User Image" style="width:50px;height:50px;">
                                <h2>${item.name}</h2>
                            </div>
                            <hr>
                            <p>${item.comment}</p>
                        </div>
                    `;

                }
            });
            // Добавляем обработчики событий для новых кнопок удаления
            const newButtons = document.querySelectorAll('.delete-review-btn');
            newButtons.forEach(btn => {
                btn.addEventListener('click', async () => {
                    const reviewId = btn.dataset.id; // Получаем ID отзыва из атрибута data-id
                    try {
                            const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) {
                            throw new Error('Ошибка при удалении отзыва');
                        }
                        console.log('Отзыв успешно удален');
               
                    } catch (error) {
                        console.error('Произошла ошибка:', error);
                    }
                });
            });
        } else {
            console.error('Отзывы не найдены или данные не в ожидаемом формате');
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}



function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}


function settingReview(){
    const buttonLogin = document.querySelector('.login-btn');
    const logFormButtons = document.querySelectorAll('.logFormButton');
    const loginForm = document.querySelector('.login-form');
    const password = document.querySelector('#password');
    const pass = '6547831Qaztgb!';
    buttonLogin.addEventListener('click', ()=>{
        loginForm.classList.add('active');
    })
    
    logFormButtons.forEach(logFormButton => {
        logFormButton.addEventListener('click', ()=>{
            if(logFormButton.textContent == 'Закрыть'){
                loginForm.classList.remove('active');
            }else{
                if(password.value == pass){
                    document.querySelectorAll('.delete-review-btn').forEach(btn => btn.style.display = 'block');
                    loginForm.classList.remove('active');
                    password.value = '';
                }else{
                    document.querySelectorAll('.delete-review-btn').forEach(btn => btn.style.display = 'none');
                }
            }
        })
    })

}
settingReview();