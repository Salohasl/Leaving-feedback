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