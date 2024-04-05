document.addEventListener('DOMContentLoaded', function() {
    let startX;
    let currentIndex = 0;
    const container = document.querySelector('.them_img_container');
    const totalSlides = container.children.length;
    const slideWidth = 120; // 각 박스의 너비
    let containerWidth = totalSlides * slideWidth;
    container.style.width = `${containerWidth}px`; // 컨테이너의 너비 설정

    function moveSlide(newIndex) {
        // newIndex가 범위를 벗어나지 않도록 조정
        currentIndex = newIndex < 0 ? totalSlides - 1 : newIndex % totalSlides;
        const moveX = -(currentIndex * slideWidth);
        container.style.transform = `translateX(${moveX}px)`;
    }

    container.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', function(e) {
        const endX = e.changedTouches[0].clientX;
        const moveX = startX - endX;
        if (moveX > 50) { // 오른쪽으로 스와이프
            moveSlide(currentIndex + 1);
        } else if (moveX < -50) { // 왼쪽으로 스와이프
            moveSlide(currentIndex - 1);
        }
    });
});
