document.addEventListener('DOMContentLoaded', function() {
    let startX, moving = false;
    let currentIndex = 0; 
    const container = document.querySelector('.them_img_container');
    const boxes = container.querySelectorAll('div'); 
    const totalSlides = boxes.length;
    const slideWidth = 120; 
    let containerWidth = (totalSlides * slideWidth) - 10; 
    container.style.width = `${containerWidth}px`;
    
    function updateSlidePosition() {
        // currentIndex에 따라 컨테이너를 이동
        const moveX = -(currentIndex * (slideWidth + 10)); // 박스 너비 + 오른쪽 마진 고려
        container.style.transform = `translateX(${moveX}px)`;
    }
    

    const touchStartHandler = function(e) {
        startX = e.touches[0].clientX;
        moving = true;
    };

    const touchMoveHandler = function(e) {
        if (!moving) return;
        const touchX = e.touches[0].clientX;
        const moveX = startX - touchX;
        if (moveX > 50) { // 오른쪽으로 스와이프
            if (currentIndex < totalSlides - 1) currentIndex += 1;
            updateSlidePosition();
            moving = false;
        } else if (moveX < -50) { // 왼쪽으로 스와이프
            if (currentIndex > 0) currentIndex -= 1;
            updateSlidePosition();
            moving = false;
        }
    };

    const touchEndHandler = function() {
        moving = false;
    };

    container.addEventListener('touchstart', touchStartHandler);
    container.addEventListener('touchmove', touchMoveHandler);
    container.addEventListener('touchend', touchEndHandler);
});
