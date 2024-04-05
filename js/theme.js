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
    const slideWidth = 140;
    const maxIndex = container.children.length - 1; 

    container.style.transition = 'transform 0.5s ease'; // 부드러운 이동을 위한 트랜지션 설정

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
                moving = false; 
            } else if (moveX > 50) {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                updateSlidePosition();
                moving = false; 
            }
        }
    };

    const touchEndHandler = function() {
        moving = false;
    };

    function updateSlidePosition() {
        const moveX = -(currentIndex * slideWidth);
        container.style.transform = `translateX(${moveX}px)`;
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

    checkMediaQuery(); 
    window.addEventListener('resize', checkMediaQuery); 
});
