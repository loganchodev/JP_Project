document.addEventListener('DOMContentLoaded', function() {
    let startX, moving = false;
    let currentIndex = 0; // 현재 보여지는 첫 번째 박스의 인덱스
    const container = document.querySelector('.them_img_container');
    const boxes = container.children; // 모든 박스를 선택합니다.
    const totalBoxes = boxes.length;
    const slideWidth = 120; // 각 박스의 너비
    const gap = 10; // 박스 사이의 간격
    const visibleWidth = 600; // .content 요소의 너비와 같게 설정
    let containerWidth = totalBoxes * (slideWidth + gap) - gap; // 컨테이너의 총 너비 계산

    // 컨테이너 너비 설정
    container.style.width = `${containerWidth}px`;

    // 슬라이드 위치 업데이트 함수
    function updateSlidePosition() {
        const newPosX = -(currentIndex * (slideWidth + gap));
        container.style.transform = `translateX(${newPosX}px)`;
    }

    // 터치 시작 이벤트 핸들러
    container.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        moving = true;
    });

    // 터치 이동 이벤트 핸들러
    container.addEventListener('touchmove', function(e) {
        if (!moving) return;
        const touchX = e.touches[0].clientX;
        const moveX = startX - touchX;

        if (moveX > 50) { // 오른쪽으로 스와이프
            if (currentIndex < totalBoxes - 1) currentIndex += 1;
            updateSlidePosition();
            moving = false;
        } else if (moveX < -50) { // 왼쪽으로 스와이프
            if (currentIndex > 0) currentIndex -= 1;
            updateSlidePosition();
            moving = false;
        }
    });

    // 터치 종료 이벤트 핸들러
    container.addEventListener('touchend', function() {
        moving = false;
    });
});
