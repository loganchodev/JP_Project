document.addEventListener('DOMContentLoaded', function() {
    function checkMediaQuery() {
        if (window.matchMedia("(max-width: 600px)").matches) {
            enableSwipe();
        } else {
            disableSwipe();
        }
    }

    let startX, moving = false, currentIndex = 0;
    const container = document.querySelector('.them_img_container');
    const maxIndex = container.children.length - 1; // 마지막 인덱스 계산

    const touchStartHandler = function(e) {
        if (!moving) {
            startX = e.touches[0].clientX;
            moving = true;
        }
    };

    const touchMoveHandler = function(e) {
        if (moving) {
            const touchX = e.touches[0].clientX;
            const moveX = touchX - startX;

            if (moveX < -50) {
                currentIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
                updateSlidePosition();
                moving = false; // 스와이프 후 이동 중지
            } else if (moveX > 50) {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                updateSlidePosition();
                moving = false; // 스와이프 후 이동 중지
            }
        }
    };

    const touchEndHandler = function() {
        moving = false;
    };

    function updateSlidePosition() {
        container.style.transform = `translateX(-${100 * currentIndex}%)`; // 현재 인덱스에 따라 위치 조정
    }

    function enableSwipe() {
        container.addEventListener('touchstart', touchStartHandler);
        container.addEventListener('touchmove', touchMoveHandler);
        container.addEventListener('touchend', touchEndHandler);
    }

    function disableSwipe() {
        container.removeEventListener('touchstart', touchStartHandler);
        container.removeEventListener('touchmove', touchMoveHandler);
        container.removeEventListener('touchend', touchEndHandler);
    }

    checkMediaQuery(); // 초기 로드 시 실행
    window.addEventListener('resize', checkMediaQuery); // 창 크기 변경 시 실행
});
