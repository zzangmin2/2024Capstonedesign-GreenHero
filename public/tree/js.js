const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
// 캔버스 크기 설정 (브라우저 크기에 맞게 조절)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 배경 이미지 로딩
const backgroundImage = new Image();
backgroundImage.src = './images/Group.png';  // 배경 이미지 경로

backgroundImage.onload = () => {
  // 이미지 로딩이 완료되면 캔버스 배경에 그립니다.
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  // tree.init();  // 나무 초기화
};


function getColorAtPosition(canvas, event) {
  const ctx = canvas.getContext('2d');
  const x = event.clientX;  // Access clientX and clientY from the event object
  const y = event.clientY;
  const pixel = ctx.getImageData(x, y, 1, 1).data;

  // Extract RGB values directly (0 ~ 255)
  const r = pixel[0];
  const g = pixel[1];
  const b = pixel[2];

  // Debug logs (optional)
  console.log(`Clicked Pixel (R, G, B): (${r}, ${g}, ${b})`);

  // Return RGB object
  return { r, g, b };
}



export class Branch {
  constructor(startX, startY, endX, endY, lineWidth, isLastBranch) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.color = isLastBranch ? '#008000' : '#623400';
      this.lineWidth = lineWidth;
      this.frame = 30;
      this.cntFrame = 0;
      this.gapX = (this.endX - this.startX) / this.frame;
      this.gapY = (this.endY - this.startY) / this.frame;
      this.currentX = this.startX;
      this.currentY = this.startY;
  }

  draw(ctx) {
      if (this.cntFrame === this.frame) return true;

      ctx.beginPath();
      this.currentX += this.gapX;
      this.currentY += this.gapY;
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.currentX, this.currentY);

      if (this.lineWidth < 3) {
          ctx.lineWidth = 0.5;
      } else if (this.lineWidth < 7) {
          ctx.lineWidth = this.lineWidth * 0.7;
      } else if (this.lineWidth < 10) {
          ctx.lineWidth = this.lineWidth * 0.9;
      } else {
          ctx.lineWidth = this.lineWidth;
      }

      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.closePath();

      this.cntFrame++;

      if (this.cntFrame === this.frame) return true;
      return false;
  }
}

export class Tree {
  constructor(ctx, posX, posY, autoCreate = true) {
      this.ctx = ctx;
      this.posX = posX;
      this.posY = posY;
      this.branches = [];
      this.depth = 7;
      this.cntDepth = 0;
      this.animation = null;
      this.clickCount = 0; // 클릭 횟수 추적
      this.totalClicks = 15; // 전체 클릭 가능 횟수
      this.remainingClicks = this.totalClicks; // 남은 클릭 횟수
      this.showClickCount(); // 클릭 횟수 표시
      if (autoCreate) { // autoCreate 값에 따라 나무를 생성할지 여부를 결정합니다.
          this.init();
      }
      this.animalCount = 0; // 동물 카운트를 초기화합니다.
      this.animalIndex = 0; // 동물 인덱스를 초기화합니다.
  }

  showClickCount() {
      if (!this.clickCountElement) {
          this.clickCountElement = document.createElement('div');
          this.clickCountElement.id = 'clickCountOverlay'; // 요소 ID 추가
          this.clickCountElement.style.position = 'fixed';
          this.clickCountElement.style.top = '50%';
          this.clickCountElement.style.left = '50%';
          this.clickCountElement.style.transform = 'translate(-50%, -50%)';
          this.clickCountElement.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
          this.clickCountElement.style.padding = '20px';
          this.clickCountElement.style.borderRadius = '10px';
          this.clickCountElement.style.display = 'none';

          const clickCountTextElement = document.createElement('p');
          clickCountTextElement.id = 'clickCountText'; // 텍스트 요소 ID 추가
          clickCountTextElement.style.textAlign = 'center';
          clickCountTextElement.style.fontSize = '18px';
          clickCountTextElement.style.margin = '0';

          this.clickCountElement.appendChild(clickCountTextElement);
          document.body.appendChild(this.clickCountElement);
      }
  }

  decrementClickCount() {
      this.remainingClicks--;
      this.updateClickCountDisplay();
  }

  isClickLimitReached() {
      return this.remainingClicks <= 0;
  }

  updateClickCountDisplay() {
      const clickCountTextElement = document.getElementById('clickCountText');
      clickCountTextElement.textContent = `남은 클릭 횟수: ${this.remainingClicks}/${this.totalClicks}`;

      const clickCountOverlay = document.getElementById('clickCountOverlay');
      clickCountOverlay.style.display = 'block';

      setTimeout(() => {
          clickCountOverlay.style.display = 'none';
      }, 2000); // 2초 뒤에 숨김
  }

  drawAnimal(x, y) {
      if (Math.random() < 0.25) {
          this.animalIndex = this.random(1, 3); // 랜덤하게 동물 인덱스를 설정합니다.
          this.showAnimalFoundMessage(); // 동물을 찾았습니다 메시지 표시
          const img = new Image();
          img.src = `images/${this.animalIndex}.png`; // 동물 인덱스에 따라 다른 이미지 선택
          img.onload = () => {
              const scaledWidth = img.width * 0.6;
              const scaledHeight = img.height * 0.6;
              if (this.clickCount % 2 === 0) {
                  this.ctx.drawImage(img, x, y + 60 - scaledHeight / 2, scaledWidth, scaledHeight);
              } else {
                  this.ctx.drawImage(img, x, y + 60 - scaledHeight / 2, scaledWidth, scaledHeight);
              }

          };
      }
  }

  init() {
      for (let i = 0; i < this.depth; i++) {
          this.branches.push([]);
      }

      this.createBranch(this.posX, this.posY, -90, 0);
      this.draw();
  }

  createBranch(startX, startY, angle, depth) {
      if (depth === this.depth) return;

      const len = depth === 0 ? this.random(10, 13) : this.random(0, 11);

      const endX = startX + this.cos(angle) * len * (this.depth - depth);
      const endY = startY + this.sin(angle) * len * (this.depth - depth);

      const isLastBranch = depth === this.depth - 1;

      this.branches[depth].push(
          new Branch(startX, startY, endX, endY, this.depth - depth, isLastBranch)
      );

      this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
      this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
  }

  draw() {
      if (this.cntDepth === this.depth) {
          cancelAnimationFrame(this.animation);
      }

      for (let i = this.cntDepth; i < this.branches.length; i++) {
          let pass = true;

          for (let j = 0; j < this.branches[i].length; j++) {
              pass = this.branches[i][j].draw(this.ctx);
          }

          if (!pass) break;
          this.cntDepth++;
      }

      this.animation = requestAnimationFrame(this.draw.bind(this));
  }

  
  cos(angle) {
      return Math.cos(this.degToRad(angle));
  }

  sin(angle) {
      return Math.sin(this.degToRad(angle));
  }

  degToRad(angle) {
      return (angle / 180.0) * Math.PI;
  }

  random(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
  }

  showAnimalFoundMessage() {
    this.animalCount++;
    let animalName = '';
    switch (this.animalIndex) {
        case 1:
            animalName = '코끼리';
            break;
        case 2:
            animalName = '기린';
            break;
        case 3:
            animalName = '표범';
            break;
        default:
            animalName = '알 수 없는 동물';
    }
    const message = `${animalName}을(를) 찾았습니다!`;

    // Get the message overlay element
    const messageOverlay = document.getElementById('messageOverlay');
    messageOverlay.textContent = message;
    messageOverlay.style.display = 'block';

    // Hide the message after 2 seconds
    setTimeout(() => {
        messageOverlay.style.display = 'none';
    }, 2000); // 2 seconds
}
}
// const canvas = document.getElementById('treeCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const tree = new Tree(ctx, canvas.width / 2, canvas.height, false);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tree.init();
});

const content = document.querySelector('.content');

content.addEventListener('click', (event) => {
  // Get clicked pixel's RGB color
  const clickedColor = getColorAtPosition(canvas, event);
  console.log('Clicked Pixel (R, G, B):', clickedColor); // Debug output

  // Define target color RGB values
  const targetColorRGB = {
    r: 226, // Replace with provided RGB values
    g: 245,
    b: 223
  };

  // Compare clicked color with target color
  if (
    clickedColor.r === targetColorRGB.r &&
    clickedColor.g === targetColorRGB.g &&
    clickedColor.b === targetColorRGB.b
  ) {
    // Click color matches target color
    console.log('클릭한 색상이 원하는 색상과 일치합니다.');

    // Check if click limit is reached
    if (!tree.isClickLimitReached()) {
      // Get click coordinates
      const { clientX, clientY } = event;

      // Increment click count
      tree.clickCount++;
      tree.decrementClickCount();

      // Create new tree based on click count
      if (tree.clickCount <= 3) {
        new Tree(ctx, clientX, clientY);
      } else {
        new Tree(ctx, clientX, clientY);

        // Draw animal based on click count and parity
        if (tree.clickCount % 2 === 0) {
          tree.drawAnimal(clientX, clientY, tree.clickCount % 3);
        } else {
          tree.drawAnimal(clientX - 40, clientY, tree.clickCount % 3);
        }
      }
    } else {
      // Click limit reached, do nothing
    }
  } else {
    // Click color does not match target color
    console.log('클릭한 색상이 원하는 색상과 일치하지 않습니다.');
  }
});



function toggleOverlay() {
  const overlay = document.querySelector('.wrap');
  overlay.classList.toggle('show');
}

content.addEventListener('click', (event) => {
if (tree.clickCount >= 15) {
  
  toggleOverlay(); // .wrap 요소 표시
  const mission = document.getElementById("mission");
    const missionBtn = document.getElementById("missionBtn");
    const missionClear = document.getElementById("missionClear");

    missionBtn.style.display = "block";
    mission.style.display = "block";
    missionClear.style.display = "block";
   // 원하는 이미지를 표시하는 코드 추가
  //  const desiredImage = document.createElement('img');
  //  desiredImage.src = './images/111.svg'; // 원하는 이미지의 경로
  //  desiredImage.style.position = 'fixed';
  //  desiredImage.style.top = '50%';
  //  desiredImage.style.left = '50%';
  //  desiredImage.style.transform = 'translate(-50%, -50%)';
  //  desiredImage.style.zIndex = '9999'; // 화면 최상위에 표시되도록 z-index 설정
  //  desiredImage.style.width = '300px';
  //  document.body.appendChild(desiredImage);

   // 원하는 이미지를 표시하는 코드 추가
  //  const desiredImage1 = document.createElement('img');
  //  desiredImage1.src = './images/222.png'; // 원하는 이미지의 경로
  //  desiredImage1.style.position = 'fixed';
  //  desiredImage1.style.top = '80%';
  //  desiredImage1.style.left = '50%';
  //  desiredImage1.style.transform = 'translate(-50%, -50%)';
  //  desiredImage1.style.zIndex = '9999'; // 화면 최상위에 표시되도록 z-index 설정
  //  desiredImage1.style.width = '300px';

  //  document.body.appendChild(desiredImage1);
  // 게임 성공 시 서버에 상태 업데이트 요청
  const accessToken = localStorage.getItem('accessToken'); // 또는 적절한 저장소에서 토큰을 가져옵니다.

  fetch('../game/updateUserGameStatus', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` // Authorization 헤더에 토큰 추가
      },
      body: JSON.stringify({ gameName: 'treeGame' })
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === '게임 상태 저장 성공') {
        console.log("treeGame complete")
          // 게임 상태 업데이트 성공 시 메인 페이지로 리다이렉트
          window.location.href = 'index.html'; // 메인 페이지 URL로 변경
      } else {
          console.error('게임 상태 업데이트 실패:', data.message);
      }
  })
  .catch(error => {
      console.error('서버 오류:', error);
  });
}


  // .wrap 요소에 대한 클릭 이벤트 처리 추가
  if (event.target.closest('.wrap')) {
    toggleOverlay(); // 클릭 시 .wrap 요소 토글
  }
});
