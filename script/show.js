function showNav(){
    const fixNav = document.querySelector('.fix-nav');
  
    document.addEventListener('scroll', ()=>{
      if(window.scrollY > 100){
        fixNav.classList.add('active');
      }else{
        fixNav.classList.remove('active');
      }
    })
  }
  showNav();

/* Для всплывающего окна */ 
const menuBtn = document.querySelector('.menuBtn');
const menu = document.querySelector('nav');
menuBtn.addEventListener('click', () =>{
    menuBtn.classList.toggle('active');
    menu.classList.toggle('popUp');
});
document.addEventListener('click', function(event) {
    // Проверяем, что клик произошел вне меню и кнопки открытия
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        // Закрываем меню, добавляя класс, который изменяет его видимость или другие свойства
        menu.classList.remove('popUp');
        menuBtn.classList.remove('active');
    }
});