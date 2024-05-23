document.addEventListener('DOMContentLoaded', () => {
  let selectedTrash = null;
  let correctCount = 0;
  const totalTrash = document.querySelectorAll('.trash-item').length;
  const successOverlay = document.getElementById('success-overlay');
  const successImage1 = document.getElementById('success-image1');
  const successImage2 = document.getElementById('success-image2');
  const messageDiv = document.getElementById('message');

  function checkCompletion() {
    if (correctCount === totalTrash) {
      successOverlay.style.display = 'flex';
      successImage1.style.display = 'flex';
      successImage2.style.display = 'flex';
    }
  }

  function showMessage(text, isSuccess) {
    messageDiv.textContent = text;
    messageDiv.className = isSuccess ? 'success' : 'failure';
    messageDiv.style.display = 'block';
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 2000);
  }

  document.querySelectorAll('.trash-item').forEach(item => {
    item.addEventListener('click', () => {
      if (selectedTrash) {
        selectedTrash.classList.remove('selected');
      }
      selectedTrash = item;
      selectedTrash.classList.add('selected');
    });
  });

  document.querySelectorAll('.trash-bin').forEach(bin => {
    bin.addEventListener('click', () => {
      if (selectedTrash) {
        if (selectedTrash.getAttribute('data-type') === bin.getAttribute('data-type')) {
          showMessage('올바른 분리수거입니다!', true);
          selectedTrash.remove();
          correctCount++;
          checkCompletion();
        } else {
          showMessage('잘못된 분리수거입니다. 다시 시도하세요.', false);
        }
        selectedTrash.classList.remove('selected');
        selectedTrash = null;
      }
    });
  });

  // successOverlay를 숨김
  successOverlay.style.display = 'none';
});

// successOverlay를 클릭했을 때는 아무 동작도 하지 않도록 함
successOverlay.addEventListener('click', (event) => {
  event.stopPropagation(); // 이벤트 버블링을 막음
});

// successOverlay를 클릭하면 사라지도록 함
successOverlay.addEventListener('click', () => {
  successOverlay.style.display = 'none';
});
