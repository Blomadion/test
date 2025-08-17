// Обработчик прокрутки
document.addEventListener('scroll', handleScroll);

// Функция обработки прокрутки
function handleScroll() {
  const scrollY = window.scrollY || window.pageYOffset;
  const maxOpacity = 1;            
  const minOpacity = 0.2;          
  const maxDistance = 500;         
  const blurAmount = 10;           

  // Уровень прозрачности и размытия
  const currentOpacity = Math.max(minOpacity, maxOpacity - scrollY / maxDistance);
  const translateZValue = -(scrollY * 0.05); 

  // Изменение свойств фона
  const bgImage = document.querySelector('.background-image');
  bgImage.style.filter = `blur(${blurAmount * (1 - currentOpacity)}px)`; 
  bgImage.style.transform = `translateZ(${translateZValue}px)`; 
  bgImage.style.opacity = `${currentOpacity}`;
}

// Обработка изменения размеров окна
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
