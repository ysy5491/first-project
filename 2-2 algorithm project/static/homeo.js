document.addEventListener('DOMContentLoaded', function () {
    // 슬라이드 쇼 관련 변수 초기화
    let slideIndex = 0; // 현재 슬라이드 인덱스
    const slides = document.querySelectorAll('.slides img'); // 슬라이드 이미지 요소 가져오기
    const dots = document.querySelectorAll('.dot'); // 슬라이드 하단 점 요소 가져오기

    // 슬라이드 자동 전환 함수
    function showSlides() {
        slideIndex = (slideIndex + 1) % slides.length; // 다음 슬라이드로 이동, 마지막 슬라이드 후 첫 슬라이드로 이동
        updateSlidePosition(); // 슬라이드 위치 업데이트
        setTimeout(showSlides, 5000); // 5초마다 슬라이드 전환
    }

    // 특정 슬라이드로 이동하는 함수
    function currentSlide(index) {
        slideIndex = index; // 슬라이드 인덱스를 선택된 값으로 변경
        updateSlidePosition(); // 변경된 슬라이드 표시
    }

    // 슬라이드 및 점 위치 업데이트 함수
    function updateSlidePosition() {
        slides.forEach((slide, idx) => {
            slide.style.display = idx === slideIndex ? 'block' : 'none'; // 현재 슬라이드만 표시
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === slideIndex); // 현재 슬라이드에 맞는 점 활성화
        });
    }

    // 초기 슬라이드 표시 및 자동 전환 시작
    updateSlidePosition(); // 첫 번째 슬라이드 표시
    showSlides(); // 슬라이드 자동 전환 시작

    // 슬라이드 하단 점 클릭 이벤트 추가
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index)); // 클릭 시 해당 슬라이드로 이동
    });

    // 남자/여자 카테고리 관련 DOM 요소 가져오기
    const maleBox = document.getElementById('male-box'); // 남자 카테고리 버튼
    const femaleBox = document.getElementById('female-box'); // 여자 카테고리 버튼
    const maleBoxes = document.getElementById('male-boxes'); // 남자 소박스 컨테이너
    const femaleBoxes = document.getElementById('female-boxes'); // 여자 소박스 컨테이너

    // 남자 카테고리 버튼 클릭 이벤트
    maleBox.addEventListener('click', function () {
        femaleBox.classList.remove('active'); // 여자 카테고리 비활성화
        femaleBoxes.style.display = 'none'; // 여자 소박스 숨기기

        maleBox.classList.toggle('active'); // 남자 카테고리 활성화/비활성화 토글
        maleBoxes.style.display = maleBox.classList.contains('active') ? 'flex' : 'none'; // 남자 소박스 표시/숨기기
    });

    // 여자 카테고리 버튼 클릭 이벤트
    femaleBox.addEventListener('click', function () {
        maleBox.classList.remove('active'); // 남자 카테고리 비활성화
        maleBoxes.style.display = 'none'; // 남자 소박스 숨기기

        femaleBox.classList.toggle('active'); // 여자 카테고리 활성화/비활성화 토글
        femaleBoxes.style.display = femaleBox.classList.contains('active') ? 'flex' : 'none'; // 여자 소박스 표시/숨기기
    });

    // 특정 카테고리의 모든 사진 숨기는 함수
    function hideAllPhotos(category) {
        const photos = document.querySelectorAll(`.${category}-photos`);
        photos.forEach(photo => photo.classList.add('hidden')); // 해당 카테고리의 사진 숨기기
    }

    // 모든 카테고리의 사진 숨기는 함수
    function hideAllCategories() {
        const allPhotos = document.querySelectorAll('.male-photos, .female-photos');
        allPhotos.forEach(photo => photo.classList.add('hidden')); // 모든 사진 숨기기
    }

    // 특정 카테고리의 모든 사진 보이기
    function showAllPhotos(category) {
        const photos = document.querySelectorAll(`.${category}-photos`);
        photos.forEach(photo => photo.classList.remove('hidden')); // 해당 카테고리의 사진 표시
    }

    // 특정 사진 컨테이너만 보이도록 설정하는 함수
    function showSpecificPhotos(containerId) {
        const photoContainer = document.getElementById(containerId);
        if (photoContainer) {
            photoContainer.classList.remove('hidden'); // 지정된 컨테이너 표시
        }
    }

    // 현재 활성화된 small box 상태 관리 객체
    const activeState = {
        male: null, // 남자 카테고리 활성화 상태
        female: null, // 여자 카테고리 활성화 상태
    };

    let currentCategory = null; // 현재 활성화된 카테고리

    // 카테고리별 small-box 클릭 이벤트 처리 함수
    function setupSmallBoxEvents(category) {
        const smallBoxes = document.querySelectorAll(`#${category}-boxes .small-box`);

        smallBoxes.forEach(box => {
            box.addEventListener('click', function () {
                const isAllButton = box.id === `${category}-all`; // "전체" 버튼인지 확인
                const photoId = `${category}-${box.id.replace(`${category}-`, '')}-photos`; // 사진 컨테이너 ID 생성

                if (currentCategory !== category) {
                    hideAllCategories(); // 다른 카테고리의 모든 사진 숨김
                    currentCategory = category; // 현재 카테고리 업데이트
                }

                if (isAllButton) {
                    if (activeState[category] === 'all') {
                        hideAllPhotos(category); // "전체" 버튼 다시 클릭 시 사진 숨김
                        activeState[category] = null;
                    } else {
                        hideAllPhotos(category); // 다른 사진 숨기고
                        showAllPhotos(category); // 전체 사진 표시
                        activeState[category] = 'all';
                    }
                } else {
                    if (activeState[category] === photoId) {
                        hideAllPhotos(category); // 동일 사진 숨기기
                        activeState[category] = null;
                    } else {
                        hideAllPhotos(category); // 다른 사진 숨기고
                        showSpecificPhotos(photoId); // 특정 사진 표시
                        activeState[category] = photoId;
                    }
                }
            });
        });
    }

    // 좋아요 버튼 이벤트 처리 함수
    function setupLikeIcons() {
        const likeIcons = document.querySelectorAll('.like-icon img');

        likeIcons.forEach(icon => {
            icon.addEventListener('click', function () {
                const isLiked = icon.dataset.liked === 'true'; // 현재 좋아요 상태 확인

                if (isLiked) {
                    icon.src = '좋아요(x).png'; // 좋아요 취소
                    icon.dataset.liked = 'false';
                } else {
                    icon.src = '좋아요(o).png'; // 좋아요 누름
                    icon.dataset.liked = 'true';
                }
            });
        });
    }

    // 남자 카테고리 small-box 이벤트 설정
    setupSmallBoxEvents('male');

    // 여자 카테고리 small-box 이벤트 설정
    setupSmallBoxEvents('female');

    // 좋아요 아이콘 클릭 이벤트 설정
    setupLikeIcons();
});
