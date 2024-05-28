const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const insertId = document.getElementById("id").value;
  const insertPassword = document.getElementById("password").value;

  const formData = {
    id: insertId,
    password: insertPassword,
  };

  console.log(formData);

  const url = "http://localhost:4000/user/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("로그인 성공!");

      const data = await response.json();
      const accessToken = data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      window.location.href = "/";
    } else {
      console.error("로그인 실패");
      // 실패 시 적절한 처리
    }
  } catch (error) {
    console.error("오류 발생", error);
  }
});
