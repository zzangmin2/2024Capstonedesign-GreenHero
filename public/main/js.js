// const water = document.querySelector("");

// function treeMake() {
//   // 이미지 요소를 선택
//   var treeImage = document.getElementById("treeImage");

//   // 이미지를 body의 직계 자식으로 이동
//   document.body.appendChild(treeImage);

//   // GSAP 애니메이션 실행
//   gsap.to("#treeImage", {
//     duration: 1, // 1초 동안 애니메이션
//     width: "90vw", // 이미지 너비를 화면 너비의 90%로 설정
//     top: "50%", // 상단에서 50% 위치
//     left: "50%", // 왼쪽에서 50% 위치
//     xPercent: -50, // x축 기준 -50% 만큼 이동하여 중앙 정렬
//     yPercent: -50, // y축 기준 -50% 만큼 이동하여 중앙 정렬
//     position: "fixed", // 고정된 위치
//     ease: "power1.out", // 부드러운 움직임을 위한 이징 함수
//     onComplete: function () {
//       const treeImage = document.getElementById("treeImage");
//       treeImage.style.display = "none"; // treeImage를 안 보이게 설정

//       const overlay = document.getElementById("overlay");
//       overlay.style.display = "block"; // 오버레이 표시

//       treeLoadAndExecuteScripts(); // 그 후 HTML 내용을 로드
//     },
//   });
// }

// function treeLoadAndExecuteScripts() {
//   fetch("index2.html")
//     .then((response) => response.text())
//     .then((html) => {
//       const contentArea = document.getElementById("contentArea");
//       contentArea.innerHTML = html;
//       contentArea.style.display = "block"; // 내용을 불러온 후 보이도록 설정

//       // 스크립트 태그 찾기
//       const scripts = contentArea.querySelectorAll("script");
//       scripts.forEach((script) => {
//         const newScript = document.createElement("script");

//         if (script.src) {
//           // 외부 스크립트의 경우, src 속성을 설정
//           newScript.src = script.src;
//         } else {
//           // 인라인 스크립트의 경우, 내용을 복사
//           newScript.textContent = script.textContent;
//         }

//         document.body.appendChild(newScript);
//       });
//     })
//     .catch((error) => console.error("Error loading the HTML content:", error));
// }

// function lightMake() {
//   // 이미지 요소를 선택
//   var lightImage = document.getElementById("lightImage");

//   // 이미지를 body의 직계 자식으로 이동
//   document.body.appendChild(lightImage);

//   // GSAP 애니메이션 실행
//   gsap.to("#lightImage", {
//     duration: 1, // 1초 동안 애니메이션
//     width: "90vw", // 이미지 너비를 화면 너비의 90%로 설정
//     top: "50%", // 상단에서 50% 위치
//     left: "50%", // 왼쪽에서 50% 위치
//     xPercent: -50, // x축 기준 -50% 만큼 이동하여 중앙 정렬
//     yPercent: -50, // y축 기준 -50% 만큼 이동하여 중앙 정렬
//     position: "fixed", // 고정된 위치
//     ease: "power1.out", // 부드러운 움직임을 위한 이징 함수
//     onComplete: function () {
//       const treeImage = document.getElementById("lightImage");
//       treeImage.style.display = "none"; // treeImage를 안 보이게 설정

//       const overlay = document.getElementById("overlay");
//       overlay.style.display = "block"; // 오버레이 표시

//       lightLoadAndExecuteScripts(); // 그 후 HTML 내용을 로드
//     },
//   });
// }

// function lightLoadAndExecuteScripts() {
//   fetch("light.html")
//     .then((response) => response.text())
//     .then((html) => {
//       const contentArea = document.getElementById("contentArea");
//       contentArea.innerHTML = html;
//       contentArea.style.display = "block"; // 내용을 불러온 후 보이도록 설정

//       // 스크립트 태그 찾기
//       const scripts = contentArea.querySelectorAll("script");
//       scripts.forEach((script) => {
//         const newScript = document.createElement("script");

//         if (script.src) {
//           // 외부 스크립트의 경우, src 속성을 설정
//           newScript.src = script.src;
//         } else {
//           // 인라인 스크립트의 경우, 내용을 복사
//           newScript.textContent = script.textContent;
//         }

//         document.body.appendChild(newScript);
//       });
//     })
//     .catch((error) => console.error("Error loading the HTML content:", error));
// }

// function waterMake() {
//   // 이미지 요소를 선택
//   var waterImage = document.getElementById("waterImage");

//   // 이미지를 body의 직계 자식으로 이동
//   document.body.appendChild(waterImage);

//   // GSAP 애니메이션 실행
//   gsap.to("#waterImage", {
//     duration: 1, // 1초 동안 애니메이션
//     width: "90vw", // 이미지 너비를 화면 너비의 90%로 설정
//     top: "50%", // 상단에서 50% 위치
//     left: "50%", // 왼쪽에서 50% 위치
//     xPercent: -50, // x축 기준 -50% 만큼 이동하여 중앙 정렬
//     yPercent: -50, // y축 기준 -50% 만큼 이동하여 중앙 정렬
//     position: "fixed", // 고정된 위치
//     ease: "power1.out", // 부드러운 움직임을 위한 이징 함수
//     onComplete: function () {
//       const treeImage = document.getElementById("waterImage");
//       treeImage.style.display = "none"; // treeImage를 안 보이게 설정

//       const overlay = document.getElementById("overlay");
//       overlay.style.display = "block"; // 오버레이 표시

//       waterLoadAndExecuteScripts(); // 그 후 HTML 내용을 로드
//     },
//   });
// }

// function waterLoadAndExecuteScripts() {
//   fetch("test.html")
//     .then((response) => response.text())
//     .then((html) => {
//       const contentArea = document.getElementById("contentArea");
//       contentArea.innerHTML = html;
//       contentArea.style.display = "block"; // 내용을 불러온 후 보이도록 설정

//       // 스크립트 태그 찾기
//       const scripts = contentArea.querySelectorAll("script");
//       scripts.forEach((script) => {
//         const newScript = document.createElement("script");

//         if (script.src) {
//           // 외부 스크립트의 경우, src 속성을 설정
//           newScript.src = script.src;
//         } else {
//           // 인라인 스크립트의 경우, 내용을 복사
//           newScript.textContent = script.textContent;
//         }

//         document.body.appendChild(newScript);
//       });
//     })
//     .catch((error) => console.error("Error loading the HTML content:", error));
// }

// JavaScript 코드
window.addEventListener("load", async () => {
  // localStorage에서 accessToken 가져오기
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  if (!accessToken) {
    console.error("accessToken이 없습니다.");
    return;
  }

  try {
    // 사용자 정보 요청
    const response = await fetch("http://localhost:4000/user/getUserInfo", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();

      // UI 업데이트
      const userCoinElement = document.getElementById("userCoin");
      const userNameElement = document.getElementById("userName");

      userCoinElement.textContent = data.coin;
      userNameElement.textContent = data.name;
    } else {
      console.error("사용자 정보를 가져오는 데 실패했습니다.");
    }
  } catch (error) {
    console.error("오류 발생:", error);
  }
});


// 모달
document.addEventListener('DOMContentLoaded', () => {
  const userInfoContainer = document.querySelector('.user-info-container');
  const userModal = document.getElementById('userModal');

  // 모달창을 토글하는 함수
  function toggleModal() {
    if (userModal.style.display === 'block') {
      userModal.style.display = 'none';
    } else {
      // 모달의 가로 길이를 user-info-container의 가로 길이와 같게 설정
      const containerWidth = userInfoContainer.offsetWidth;
      userModal.style.width = `${containerWidth}px`;

      userModal.style.display = 'block';
      const rect = userInfoContainer.getBoundingClientRect();
      userModal.style.top = `${rect.bottom}px`; // user-info-container의 하단에 위치
      userModal.style.left = `${rect.left}px`; // 동일한 위치에 맞춤
    }
  }

  // 사용자 정보 div 클릭 시 모달창 토글
  userInfoContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleModal();
  });

  // 모달창 외부를 클릭했을 때 모달창 숨김
  document.addEventListener('click', (event) => {
    if (userModal.style.display === 'block' && !userInfoContainer.contains(event.target) && !userModal.contains(event.target)) {
      userModal.style.display = 'none';
    }
  });

  // '마이페이지' 버튼 클릭 이벤트 처리
  document.getElementById('myPageBtn').addEventListener('click', () => {
    // window.location.href = '/mypage'; // 마이페이지로 이동
    alert("마이페이지는 구현 준비 중입니다!")
  });

  // '로그아웃' 버튼 클릭 이벤트 처리
  document.getElementById('logoutBtn').addEventListener('click', () => {
    // 로그아웃 로직 처리
    localStorage.removeItem('accessToken'); // 예시로 localStorage에서 토큰 삭제
    window.location.href = '/login'; // 로그인 페이지로 이동
  });
});