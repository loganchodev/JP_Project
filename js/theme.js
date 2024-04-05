document.addEventListener('DOMContentLoaded', function() {
    let startX;
    let moveX;
    let container = document.querySelector('.them_img_container');
  
    const touchStartHandler = function(e) {
      startX = e.touches[0].pageX;
      moveX = 0;
    };
  
    const touchMoveHandler = function(e) {
      e.preventDefault();
      let touchX = e.touches[0].pageX;
      moveX = touchX - startX;
    };
  
    const touchEndHandler = function(e) {
      if (moveX < -50) {
        console.log('Swipe Left');
      } else if (moveX > 50) {
        console.log('Swipe Right');
      }
    };
  
    function checkMediaQuery() {
      if (window.matchMedia("(max-width: 600px)").matches) {
        // 화면이 600px 이하일 경우 이벤트 리스너 추가
        container.addEventListener('touchstart', touchStartHandler);
        container.addEventListener('touchmove', touchMoveHandler);
        container.addEventListener('touchend', touchEndHandler);
      } else {
        // 화면이 600px 초과일 경우 이벤트 리스너 제거
        container.removeEventListener('touchstart', touchStartHandler);
        container.removeEventListener('touchmove', touchMoveHandler);
        container.removeEventListener('touchend', touchEndHandler);
      }
    }
  
    // 페이지 로드 시 및 화면 크기 변경 시 미디어 쿼리 확인
    checkMediaQuery();
    window.addEventListener('resize', checkMediaQuery);
  });
  