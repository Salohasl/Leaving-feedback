function showFaq(){
    const btnFaq = document.querySelectorAll('.btnFaq');
    const faqAnswers = document.querySelectorAll('.faq-block__answer');

    btnFaq.forEach(elem =>{
        elem.addEventListener('click',()=>{
            for(let faqAnswer of faqAnswers){
                if(elem.dataset.faq == faqAnswer.dataset.faq){
                    faqAnswer.classList.toggle('active');
                    elem.classList.toggle('rotate');
                }
            }
        })
    })
}
showFaq();

const faqBlocks = document.querySelectorAll('.faq-block');
const observerCallback = (entries, observer) => {
 entries.forEach(entry => {
    // Check if the faqBlock is intersecting
    if (entry.isIntersecting) {
      // Проверяем, пересекается ли faqBlock
      entry.target.classList.add('anim');
      // При желании прекратите наблюдение за faqBlock, если вы хотите, чтобы анимация запускалась только один раз.
      observer.unobserve(entry.target);
    }
 });
};
// экземпляр IntersectionObserver
const observer = new IntersectionObserver(observerCallback, {
 // При необходимости отрегулируйте rootMargin и порог
 rootMargin: '0px',
 threshold: .5
});

// Следите за каждым faqBlock
for (let faqBlock of faqBlocks) {
    observer.observe(faqBlock);
}

