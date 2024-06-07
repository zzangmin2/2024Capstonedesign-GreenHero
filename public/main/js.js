//성공한 게임 표시
function updateThumbnails(data) {
  const gameMapping = [
    { gameKey: "trashGame", elementId: "trashImage" },
    { gameKey: "waterGame", elementId: "waterImage" },
    { gameKey: "treeGame", elementId: "treeImage" },
    { gameKey: "lightGame", elementId: "lightImage" },
  ];

  gameMapping.forEach(({ gameKey, elementId }) => {
    if (data[gameKey]) {
      const element = document.getElementById(elementId);
      if (element) {
        const parentElement = element.parentElement;
        const spanElement = parentElement.querySelector(".success-tag");
        if (spanElement) {
          spanElement.classList.add("success-game");
        }
      }
    }
  });
}

// JavaScript 코드
window.addEventListener("load", async () => {
  // localStorage에서 accessToken 가져오기
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  if (!accessToken) {
    const $userName = document.getElementById("userName");
    const $userModal = document.getElementById("userModal");

    if ($userName) {
      $userName.textContent = "로그인 해주세요!";
    } else {
      console.error('Element with ID "userName" not found.');
    }

    if ($userModal) {
      $userModal.style.display = "none";
    } else {
      console.error('Element with ID "userModal" not found.');
    }

    return;
  }

  // 사용자 정보 요청
  try {
    const response = await fetch("http://localhost:4000/user/getUserInfo", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();

      console.log(data);

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

  // 사용자 게임 정보 요청
  try {
    const response = await fetch("http://localhost:4000/game/getUserGameInfo", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();

      console.log(data);

      updateThumbnails(data);

      //   // UI 업데이트
      //   const userCoinElement = document.getElementById("userCoin");
      //   const userNameElement = document.getElementById("userName");

      //   userCoinElement.textContent = data.coin;
      //   userNameElement.textContent = data.name;
    } else {
      console.error("사용자 정보를 가져오는 데 실패했습니다.");
    }
  } catch (errror) {}
});

// 모달
document.addEventListener("DOMContentLoaded", () => {
  const userInfoContainer = document.querySelector(".user-info-container");
  const userModal = document.getElementById("userModal");

  const accessToken = localStorage.getItem("accessToken");

  // accessToken이 없는 경우
  if (!accessToken) {
    userInfoContainer.addEventListener("click", () => {
      window.location.href = "/login";
    });
    return;
  }

  // 모달창을 토글하는 함수
  function toggleModal() {
    if (userModal.style.display === "block") {
      userModal.style.display = "none";
    } else {
      // 모달의 가로 길이를 user-info-container의 가로 길이와 같게 설정
      const containerWidth = userInfoContainer.offsetWidth;
      userModal.style.width = `${containerWidth}px`;

      userModal.style.display = "block";
      const rect = userInfoContainer.getBoundingClientRect();
      userModal.style.top = `${rect.bottom}px`; // user-info-container의 하단에 위치
      userModal.style.left = `${rect.left}px`; // 동일한 위치에 맞춤
    }
  }

  // 사용자 정보 div 클릭 시 모달창 토글
  userInfoContainer.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleModal();
  });

  // 모달창 외부를 클릭했을 때 모달창 숨김
  document.addEventListener("click", (event) => {
    if (
      userModal.style.display === "block" &&
      !userInfoContainer.contains(event.target) &&
      !userModal.contains(event.target)
    ) {
      userModal.style.display = "none";
    }
  });

  // '마이페이지' 버튼 클릭 이벤트 처리
  const myPageBtn = document.getElementById("myPageBtn");
  if (myPageBtn) {
    myPageBtn.addEventListener("click", () => {
      // window.location.href = '/mypage'; // 마이페이지로 이동
      alert("마이페이지는 구현 준비 중입니다!");
    });
  }

  // '로그아웃' 버튼 클릭 이벤트 처리
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("이미 로그아웃 상태입니다.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/user/logout", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);

          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        } else {
          console.error("로그아웃 실패:", response.statusText);
        }
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      }
    });
  }
});
