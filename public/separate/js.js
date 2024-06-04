document.addEventListener("DOMContentLoaded", () => {
  let selectedTrash = null;
  let correctCount = 0;
  const totalTrash = document.querySelectorAll(".trash-item").length;
  const successOverlay = document.getElementById("success-overlay");
  const successImage1 = document.getElementById("success-image1");
  const successImage2 = document.getElementById("success-image2");
  const messageDiv = document.getElementById("message");

  function checkCompletion() {
    if (correctCount === totalTrash) {
      successOverlay.style.display = "flex";
      successImage1.style.display = "flex";
      successImage2.style.display = "flex";

      // 게임 성공 시 서버에 상태 업데이트 요청
      const accessToken = localStorage.getItem("accessToken"); // 또는 적절한 저장소에서 토큰을 가져옵니다.

      fetch("../game/updateusergamestatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
        },
        body: JSON.stringify({ gameName: "trashGame" }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "게임 상태 저장 성공") {
            console.log("trashGame complete");
            // 게임 상태 업데이트 성공 시 메인 페이지로 리다이렉트
            window.location.href = "index.html"; // 메인 페이지 URL로 변경
          } else {
            console.error("게임 상태 업데이트 실패:", data.message);
          }
        })
        .catch((error) => {
          console.error("서버 오류:", error);
        });
    }
  }

  function showMessage(text, isSuccess) {
    messageDiv.textContent = text;
    messageDiv.className = isSuccess ? "success" : "failure";
    messageDiv.style.display = "block";
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 2000);
  }

  document.querySelectorAll(".trash-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (selectedTrash) {
        selectedTrash.classList.remove("selected");
      }
      selectedTrash = item;
      selectedTrash.classList.add("selected");
    });
  });

  document.querySelectorAll(".trash-bin").forEach((bin) => {
    bin.addEventListener("click", () => {
      if (selectedTrash) {
        if (
          selectedTrash.getAttribute("data-type") ===
          bin.getAttribute("data-type")
        ) {
          showMessage("올바른 분리수거입니다!", true);
          selectedTrash.remove();
          correctCount++;
          if (correctCount === totalTrash) {
            // 모든 쓰레기가 분리수거 완료되었을 때만 checkCompletion 호출
            checkCompletion();
          }
        } else {
          showMessage("잘못된 분리수거입니다. 다시 시도하세요.", false);
        }
        selectedTrash.classList.remove("selected");
        selectedTrash = null;
      }
    });
  });

  // successOverlay를 숨김
  successOverlay.style.display = "none";
});

// successOverlay를 클릭했을 때는 아무 동작도 하지 않도록 함
successOverlay.addEventListener("click", (event) => {
  event.stopPropagation(); // 이벤트 버블링을 막음
});

// successOverlay를 클릭하면 사라지도록 함
successOverlay.addEventListener("click", () => {
  successOverlay.style.display = "none";
});
