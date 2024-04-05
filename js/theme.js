document.addEventListener('DOMContentLoaded', function() {
    let startX, moving = false;
    let currentIndex = 0; // 현재 보여지는 박스의 인덱스
    const container = document.querySelector('.them_img_container');
    const boxes = container.querySelectorAll('div'); // 모든 이미지 박스 선택
    const totalSlides = boxes.length;
    const slideWidth = 140 + 10; // 박스 너비 + 오른쪽 마진
    let containerWidth = (totalSlides * slideWidth) - 10; // 마지막 박스 마진 제외
    container.style.width = `${containerWidth}px`;

    function updateSlidePosition() {
        let newPosX = -(currentIndex * slideWidth);
        boxes.forEach((box, index) => {
            box.style.transform = `translateX(${newPosX}px)`;
            newPosX += slideWidth;
        });
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
