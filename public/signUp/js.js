document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.getElementById('signUpForm');
  const checkDuplicateIdLink = document.getElementById('checkDuplicateId');

  // 회원가입 폼 제출 시
  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 동작(페이지 새로고침) 방지

    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    const formData = {
      id: id,
      password: password,
      name: name
    };

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('회원가입 성공!');
        // 회원가입 성공 시 추가 작업 (예: 로그인 페이지로 이동)
        window.location.href = '/login';
      } else {
        console.error('회원가입 실패');
        // 실패 시 적절한 처리
        alert('회원가입 실패: 서버 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('오류 발생', error);
      alert('오류 발생: 네트워크 오류가 발생했습니다.');
    }
  });

  // 중복 아이디 확인 시
  checkDuplicateIdLink.addEventListener('click', async (event) => {
    event.preventDefault(); // 기본 동작(링크 클릭 시 이동) 방지

    const id = document.getElementById('id').value;

    try {
      const response = await fetch('/signup/confirmduplicatedid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const result = await response.text();
        if (result === '중복된 아이디 있음') {
          alert('중복된 아이디가 있습니다.');
        } else {
          alert('사용 가능한 아이디입니다.');
        }
      } else {
        console.error('중복 확인 실패');
        alert('중복 확인 실패: 서버 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('오류 발생', error);
      alert('오류 발생: 네트워크 오류가 발생했습니다.');
    }
  });
});