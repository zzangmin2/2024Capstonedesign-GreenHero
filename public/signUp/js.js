document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.getElementById('signUpForm');
  const checkDuplicateIdLink = document.getElementById('checkDuplicateId');
  const signUpButton = document.getElementById('signUpButton');

  let isDuplicateChecked = false;

  // 입력 필드 변경 시 유효성 검사
  const validateForm = () => {
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    if (id && password && name && isDuplicateChecked) {
      signUpButton.disabled = false;
    } else {
      signUpButton.disabled = true;
    }
  };

  // 모든 입력 필드에 입력 이벤트 리스너 추가
  document.getElementById('id').addEventListener('input', validateForm);
  document.getElementById('password').addEventListener('input', validateForm);
  document.getElementById('name').addEventListener('input', validateForm);

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

    console.log('회원가입 데이터:', formData); // 콘솔 로그 추가

    try {
      const response = await fetch('http://localhost:4000/user/signup', { // 서버 주소 확인
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

    const insertId = document.getElementById('id').value;

    console.log('중복 확인 아이디:', insertId); // 콘솔 로그 추가

    try {
      const response = await fetch('http://localhost:4000/user/signup/confirmduplicatedid', { // 서버 주소 확인
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: insertId }),
      });

      if (response.ok) {
        const result = await response.text();
        console.log('중복 확인 결과:', result); // 콘솔 로그 추가
        if (result === '중복된 아이디 있음') {
          alert('중복된 아이디가 있습니다.');
          isDuplicateChecked = false; // 중복된 아이디일 경우 다시 확인해야 함
        } else {
          alert('사용 가능한 아이디입니다.');
          isDuplicateChecked = true;
          validateForm(); // 중복 확인 성공 시 폼 유효성 다시 검사
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