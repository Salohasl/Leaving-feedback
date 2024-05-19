const advantagesTexts = document.querySelectorAll('#advantages__text');
const images = document.querySelectorAll('#images');
const observerCallback = (entries, observer) => {
 entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Проверяем, пересекается ли блок
      entry.target.classList.add('anim');
      // При желании прекратите наблюдение за элементами, чтобы анимация запускалась только один раз.
      observer.unobserve(entry.target);
    }
 });
};
// экземпляр IntersectionObserver
const observer = new IntersectionObserver(observerCallback, {
 rootMargin: '0px',
 threshold: .5
});


// Следите за каждым advantagesText
for (let advantagesText of advantagesTexts) {
    observer.observe(advantagesText);
}
for(let image of images){
	observer.observe(image);
}


