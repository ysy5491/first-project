// FAQ 섹션 열기/닫기 기능
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.querySelector('.question').addEventListener('click', () => {
        // 질문을 클릭하면 답변을 표시/숨김
        item.classList.toggle('active');
        
        // 화살표 회전 처리
        const arrow = item.querySelector('.arrow');
        if (item.classList.contains('active')) {
            arrow.style.transform = 'rotate(180deg)';  // 열렸을 때 화살표 회전
        } else {
            arrow.style.transform = 'rotate(0deg)';  // 닫혔을 때 화살표 원래 상태
        }
    });
});

// 카테고리 선택에 따른 표시/숨기기
function showCategory(category) {
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(item => {
        // 선택한 카테고리에 맞는 질문만 표시
        if (item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // 활성화된 카테고리 박스에 스타일 추가
    const categoryBoxes = document.querySelectorAll('.category-box');
    categoryBoxes.forEach(box => {
        if (box.textContent.toLowerCase() === category) {
            box.style.backgroundColor = '#f0f0f0';  // 선택된 카테고리 색상 변경
            box.style.fontWeight = 'bold';  // 선택된 카테고리 글씨를 진하게
        } else {
            box.style.backgroundColor = '';  // 나머지 카테고리 기본 색상
            box.style.fontWeight = '';  // 나머지 카테고리 글씨 기본 스타일
        }
    });
}

// 기본적으로 모든 FAQ 항목을 '기능' 카테고리로 설정
document.addEventListener('DOMContentLoaded', () => {
    showCategory('feature');  // 페이지 로드 시 '기능' 카테고리만 보이도록 설정
});
