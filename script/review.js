let comments = [];
const reviewForm = document.querySelector('.review-form');
const btn = document.getElementById('reviewShow');
loadComments()

function showReview(){

   if(localStorage.getItem('comment')){
        btn.style.display = 'none';
   }else{
        btn.style.display = 'inline';
        btn.addEventListener('click', ()=>{
            reviewForm.classList.add('active');
        })
   }
}
showReview();
document.getElementById('close').onclick = () =>{
    reviewForm.classList.remove('active');
}


document.getElementById('add-review').onclick = async (event) => {
    event.preventDefault();
    const name = document.getElementById('name');
    const commentText = document.getElementById('comment');
    const imageUpload = document.getElementById('imageUpload');

    let comment = {
        name: name.value,
        body: commentText.value,
        time: Math.floor(Date.now() / 1000),
        image: ''
    }

    if (imageUpload.files.length > 0) {
        try {
            const base64String = await convertImageToBase64(imageUpload.files[0]);
            comment.image = base64String;
        } catch (error) {
            console.error("Ошибка при преобразовании изображения в Base64:", error);
        }
    }

    name.value = '';
    commentText.value = '';
    comments.push(comment);

    saveComments();
    showComments();
    reviewForm.classList.remove('active');
    btn.style.display = 'none';
}


function saveComments(){
    localStorage.setItem('comment', JSON.stringify(comments));
}

function loadComments(){
    if(localStorage.getItem('comment')) comments = JSON.parse(localStorage.getItem('comment'));
    showComments();
}

function showComments(){
    const reviewWrapper = document.querySelector('.review-wrapper');
    comments.forEach(item => {
        reviewWrapper.innerHTML += `
            <div class="review-item">
                <p>${timeConverter(item.time)}</p>
                <div class="review-item__user">
                    <img src="${item.image}" alt="User Image" style="width:50px;height:50px;">
                    <h2>${item.name}</h2>
                </div>
                <hr>
                <p>${item.body}</p>
            </div>
        `;
    })
}



function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}



function timeConverter(UNIX_timestamp){
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