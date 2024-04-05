document.addEventListener('DOMContentLoaded', function() {
    let startX, moveX = 0;
    let isDragging = false;
    const container = document.querySelector('.them_img_container');
    const totalSlides = container.children.length;
    const slideWidth = 140; // 각 박스의 너비 수정
    let containerWidth = totalSlides * slideWidth;
    container.style.width = `${containerWidth}px`; // 컨테이너의 너비 설정

    container.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        moveX = 0; // 이동 거리 초기화
    });

    container.addEventListener('touchmove', function(e) {
        if (isDragging) {
            const currentX = e.touches[0].clientX;
            moveX = currentX - startX;
            e.preventDefault(); // 페이지 스크롤 방지
        }
    });

    container.addEventListener('touchend', function(e) {
        if (isDragging) {
            if (moveX > 50) {
                moveSlide(currentIndex - 1); // 왼쪽으로 스와이프
            } else if (moveX < -50) {
                moveSlide(currentIndex + 1); // 오른쪽으로 스와이프
            }
            isDragging = false;
        }
    });

    function moveSlide(newIndex) {
        // newIndex가 범위를 벗어나지 않도록 조정
        currentIndex = newIndex < 0 ? 0 : newIndex >= totalSlides ? totalSlides - 1 : newIndex;
        const moveX = -(currentIndex * slideWidth);
        container.style.transform = `translateX(${moveX}px)`;
    }
});
