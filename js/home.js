document.addEventListener("DOMContentLoaded", function () {
  var progressValue = 5; // 초기값 설정
  var targetValue = 5; // 목표값 설정
  var animationInterval;

  // 왼쪽 화살표를 클릭할 때
  document
    .querySelector(".slide_bar_button > a:first-child")
    .addEventListener("click", function (e) {
      e.preventDefault(); // 기본 동작 방지 (링크 이동 X)

      // 목표값 감소 (최소값 0)
      if (targetValue > 0) {
        targetValue -= 5; // 10% 감소
        startAnimation();
      }
    });

  // 오른쪽 화살표를 클릭할 때
  document
    .querySelector(".slide_bar_button > a:last-child")
    .addEventListener("click", function (e) {
      e.preventDefault(); // 기본 동작 방지 (링크 이동 X)

      // 프로세스 바가 100에 도달하고 오른쪽 화살표를 클릭한 경우
      if (progressValue === 100) {
        progressValue = 10; // 10으로 초기화
        targetValue = 10; // 목표값도 10으로 설정
        updateProgress(progressValue); // 프로세스 바 업데이트
        return; // 함수 종료
      }
      // 목표값 증가 (최대값 100)
      if (targetValue < 100) {
        targetValue += 10; // 10% 증가
        startAnimation();
      }
    });

  // 애니메이션을 시작하는 함수
  function startAnimation() {
    clearInterval(animationInterval); // 기존 애니메이션 제거
    animationInterval = setInterval(function () {
      // 현재 진행 상태를 부드럽게 업데이트
      if (progressValue < targetValue) {
        progressValue += 1; // 증가
      } else if (progressValue > targetValue) {
        progressValue -= 1; // 감소
      } else {
        clearInterval(animationInterval); // 목표값 도달 시 애니메이션 중지
      }

      // 프로세스 바의 진행도 업데이트
      updateProgress(progressValue);
    }, 10); // 10ms 간격으로 애니메이션 실행
  }

  // 진행도를 업데이트하는 함수
  function updateProgress(value) {
    // 순환 로직 추가

    if (value <= 0) {
      value = 100;
      progressValue = 100;
      targetValue = 100;
    }
    document.getElementById("progress").value = value;
  }
});

//숫자 증가,감소
document.getElementById("leftArrow").addEventListener("click", function () {
  decreaseNumber();
});

document.getElementById("rightArrow").addEventListener("click", function () {
  increaseNumber();
});

let numElement = document.querySelector(".info_num");
let num = parseInt(numElement.textContent);

function increaseNumber() {
  num++;
  if (num > 10) num = 1; // 10에서 1로 순환
  updateNumber();
}

function decreaseNumber() {
  num--;
  if (num < 1) num = 10; // 1에서 10으로 순환
  updateNumber();
}

function updateNumber() {
  numElement.textContent = num.toString().padStart(2, "0");
}

///////// 메인 홈 슬라이드영역 구현하기

document.getElementById("leftArrow").addEventListener("click", function (e) {
  e.preventDefault();
  slide(-1); // 이전 슬라이드로 이동
});

document.getElementById("rightArrow").addEventListener("click", function (e) {
  e.preventDefault();
  slide(1); // 다음 슬라이드로 이동
});

let currentSlide = 0; // 현재 슬라이드의 인덱스

function slide(direction) {
  const slides = document.querySelectorAll(
    ".home_slide1, .home_slide2, .home_slide3, .home_slide4, .home_slide5"
  );
  const totalSlides = slides.length;
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides; // 슬라이드 인덱스 계산
  const offset = currentSlide * -100; // 슬라이드 이동을 위한 오프셋 계산
  document.querySelector(
    ".home_slide_container"
  ).style.transform = `translateX(${offset}vw)`; // 슬라이드 이동
}

document.addEventListener('DOMContentLoaded', function() {
  let intervalId = null; // 인터벌 ID를 저장할 변수

  function setSlidePosition(currentIndex, slides) {
    const totalSlides = slides.length;
    for (let i = 0; i < totalSlides; i++) {
      slides[i].style.transform = `translateX(${(i - currentIndex) * 100}%)`;
    }
  }

  function updateProgress(progressValue) {
    document.getElementById("progress").value = progressValue;
  }

  function increaseNumber(numElement) {
    let num = parseInt(numElement.textContent);
    num = num >= 5 ? 1 : num + 1;
    numElement.textContent = num.toString().padStart(2, "0");
  }

  function startSlideShow() {
    const slides = document.querySelectorAll('.home_slide_container > div');
    if (slides.length === 0) return; // 슬라이드가 없으면 중단
    let currentIndex = 0;
    let progressValue = 1; 
    const numElement = document.querySelector(".info_num");

    setSlidePosition(currentIndex, slides);
    updateProgress(progressValue);

    intervalId = setInterval(function() {
      currentIndex = (currentIndex + 1) % slides.length;
      setSlidePosition(currentIndex, slides);
      progressValue = progressValue >= 5 ? 1 : progressValue + 1;
      updateProgress(progressValue);
      increaseNumber(numElement);
    }, 3000); // 3초마다 실행
  }

  function checkScreenSize() {
    if (window.matchMedia("(max-width: 600px)").matches) {
      if (intervalId === null) {
        startSlideShow();
      }
    } else {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  }

  checkScreenSize(); // 초기 로드 시 실행
  window.addEventListener('resize', checkScreenSize); // 창 크기 변경 시 실행
});
