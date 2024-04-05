document.addEventListener('DOMContentLoaded', function() {
    let startX;
    let moveX;
    let container = document.querySelector('.them_img_container');
  
    function handleTouchStart(e) {
      if (window.matchMedia("(max-width: 600px)").matches) {
        startX = e.touches[0].pageX;
        moveX = 0;
      }
    }
  
    function handleTouchMove(e) {
      if (window.matchMedia("(max-width: 600px)").matches) {
        e.preventDefault();
        let touchX = e.touches[0].pageX;
        moveX = touchX - startX;
      }
    }
  
    function handleTouchEnd(e) {
      if (window.matchMedia("(max-width: 600px)").matches) {
        if (moveX < -50) {
          console.log('Swipe Left');
        } else if (moveX > 50) {
          console.log('Swipe Right');
        }
      }
    }
  
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
  });
  
