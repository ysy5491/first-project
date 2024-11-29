document.addEventListener('DOMContentLoaded', function () {
    // 슬라이드 쇼 자동 전환
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slides img'); // 슬라이드 이미지 가져오기
    const dots = document.querySelectorAll('.dot'); // 점 가져오기

    // 슬라이드 순차 전환 함수
    function showSlides() {
        slideIndex = (slideIndex + 1) % slides.length; // 슬라이드 순환
        updateSlidePosition();
        setTimeout(showSlides, 5000); // 5초마다 전환
    }

    // 현재 슬라이드로 이동하는 함수
    function currentSlide(index) {
        slideIndex = index;
        updateSlidePosition();
    }

    // 슬라이드 위치 업데이트
    function updateSlidePosition() {
        slides.forEach((slide, idx) => {
            slide.style.display = (idx === slideIndex) ? 'block' : 'none'; // 현재 슬라이드만 보이게
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === slideIndex); // 현재 슬라이드에 맞는 점 활성화
        });
    }

    // 페이지 로딩 시 자동 슬라이드 시작
    updateSlidePosition(); // 페이지 로딩 시 첫 번째 슬라이드를 정확히 표시
    showSlides(); // 자동 슬라이드 시작

    // 점 클릭 시 해당 슬라이드로 이동
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index));
    });

    // 남자/여자 버튼 클릭 시 작은 박스들 보이기/숨기기
    const maleBox = document.getElementById('male-box');
    const femaleBox = document.getElementById('female-box');
    const maleBoxes = document.getElementById('male-boxes');
    const femaleBoxes = document.getElementById('female-boxes');

    // 남자 박스 클릭 시
    maleBox.addEventListener('click', function () {
        // 여자 박스가 열려 있으면 닫기
        if (femaleBox.classList.contains('active')) {
            femaleBox.classList.remove('active');
            femaleBoxes.style.display = 'none';
        }

        // 남자 박스를 클릭하면 해당 작은 상자들만 보이게
        maleBox.classList.toggle('active');
        if (maleBox.classList.contains('active')) {
            maleBoxes.style.display = 'flex';
        } else {
            maleBoxes.style.display = 'none';
        }
    });

    // 여자 박스 클릭 시
    femaleBox.addEventListener('click', function () {
        // 남자 박스가 열려 있으면 닫기
        if (maleBox.classList.contains('active')) {
            maleBox.classList.remove('active');
            maleBoxes.style.display = 'none';
        }

        // 여자 박스를 클릭하면 해당 작은 상자들만 보이게
        femaleBox.classList.toggle('active');
        if (femaleBox.classList.contains('active')) {
            femaleBoxes.style.display = 'flex';
        } else {
            femaleBoxes.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 모든 사진을 숨기는 함수
    function hideAllPhotos(category) {
        const photos = document.querySelectorAll(`.${category}-photos`);
        photos.forEach(photo => {
            photo.classList.add('hidden');
        });
    }

    // 모든 사진 숨기기 (카테고리 구분 없이)
    function hideAllCategories() {
        const allPhotos = document.querySelectorAll('.male-photos, .female-photos');
        allPhotos.forEach(photo => {
            photo.classList.add('hidden');
        });
    }

    // 특정 카테고리의 모든 사진 보이기
    function showAllPhotos(category) {
        const photos = document.querySelectorAll(`.${category}-photos`);
        photos.forEach(photo => {
            photo.classList.remove('hidden');
        });
    }

    // 특정 사진 컨테이너 보이기
    function showSpecificPhotos(containerId) {
        const photoContainer = document.getElementById(containerId);
        if (photoContainer) {
            photoContainer.classList.remove('hidden');
        }
    }

    // 현재 활성화된 small box를 확인하고 관리
    const activeState = {
        male: null,
        female: null,
    };

    let currentCategory = null; // 현재 활성화된 카테고리

    // 카테고리별 small-box 클릭 이벤트 처리
    function setupSmallBoxEvents(category) {
        const smallBoxes = document.querySelectorAll(`#${category}-boxes .small-box`);

        smallBoxes.forEach(box => {
            box.addEventListener('click', function () {
                const isAllButton = box.id === `${category}-all`;
                const photoId = `${category}-${box.id.replace(`${category}-`, '')}-photos`;

                // 카테고리 전환 감지
                if (currentCategory !== category) {
                    hideAllCategories(); // 다른 카테고리의 모든 사진 숨김
                    currentCategory = category; // 현재 카테고리 업데이트
                }

                if (isAllButton) {
                    // #전체 버튼 클릭 시
                    if (activeState[category] === 'all') {
                        // 이미 #전체 활성화 상태 -> 사진 숨김
                        hideAllPhotos(category);
                        activeState[category] = null;
                    } else {
                        // 다른 상태에서 #전체로 전환
                        hideAllPhotos(category); // 기존 사진 숨김
                        showAllPhotos(category); // 전체 사진 보이기
                        activeState[category] = 'all';
                    }
                } else {
                    // 특정 small-box 클릭 시
                    if (activeState[category] === photoId) {
                        // 이미 해당 small box 활성화 상태 -> 사진 숨김
                        hideAllPhotos(category);
                        activeState[category] = null;
                    } else {
                        // 다른 상태에서 해당 small box로 전환
                        hideAllPhotos(category); // 기존 사진 숨김
                        showSpecificPhotos(photoId); // 해당 small box 사진 보이기
                        activeState[category] = photoId;
                    }
                }
            });
        });
    }

    // 남자 카테고리 이벤트 설정
    setupSmallBoxEvents('male');

    // 여자 카테고리 이벤트 설정
    setupSmallBoxEvents('female');
});

