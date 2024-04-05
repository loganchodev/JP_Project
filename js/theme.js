document.addEventListener('DOMContentLoaded', function() {
    let startX, currentX, moving = false;
    let currentIndex = 0;
    const container = document.querySelector('.them_img_container');
    const totalBoxes = container.children.length;
    const slideWidth = 120;
    const gap = 10;
    let containerWidth = totalBoxes * (slideWidth + gap) - gap;
    container.style.width = `${containerWidth}px`;
    container.style.transition = 'transform 0.5s ease-out'; // 부드러운 이동을 위한 트랜지션 설정 조정

    function updateSlidePosition(final = false) {
        if (!final) {
            let moveX = startX - currentX;
            let newPos = -(currentIndex * (slideWidth + gap)) - moveX;
            container.style.transition = 'none'; // 실시간 드래그/스와이프 시 트랜지션 비활성화
            container.style.transform = `translateX(${newPos}px)`;
        } else {
            const newPosX = -(currentIndex * (slideWidth + gap));
            container.style.transition = 'transform 0.5s ease-out'; // 최종 위치 이동 시 트랜지션 활성화
            container.style.transform = `translateX(${newPosX}px)`;
        }
    }

    const startHandler = function(e) {
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        moving = true;
        container.style.transition = 'none'; // 드래그/스와이프 시작 시 트랜지션 비활성화
    };

    const moveHandler = function(e) {
        if (!moving) return;
        currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        updateSlidePosition(); // 실시간으로 위치 업데이트
    };

    const endHandler = function() {
        if (!moving) return;
        let moveX = startX - currentX;
        if (moveX > 50 && currentIndex < totalBoxes - 1) { // 오른쪽으로 스와이프/드래그
            currentIndex += 1;
        } else if (moveX < -50 && currentIndex > 0) { // 왼쪽으로 스와이프/드래그
            currentIndex -= 1;
        }
        updateSlidePosition(true); // 최종 위치로 부드럽게 이동
        moving = false;
    };

    // 터치 및 마우스 이벤트 리스너 등록
    container.addEventListener('touchstart', startHandler);
    container.addEventListener('mousedown', startHandler);
    container.addEventListener('touchmove', moveHandler);
    container.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchend', endHandler);
    document.addEventListener('mouseup', endHandler);
});
