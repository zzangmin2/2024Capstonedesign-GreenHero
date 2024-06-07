/*
// div 요소 가져오기
var resizableDiv = document.getElementById('resizableDiv');

// 마우스 다운 이벤트 처리
resizableDiv.addEventListener('mousedown', function(event) {
    // 시작 좌표 설정
    var startX = event.clientX;
    var startY = event.clientY;

    // div의 초기 크기
    var startWidth = parseInt(document.defaultView.getComputedStyle(resizableDiv).width, 10);
    var startHeight = parseInt(document.defaultView.getComputedStyle(resizableDiv).height, 10);

    // 마우스 이동 이벤트 처리
    function onMouseMove(event) {
        // 이동한 거리 계산
        var deltaX = event.clientX - startX;
        var deltaY = event.clientY - startY;

        // 새로운 너비 계산
        var newWidth = startWidth + deltaX;

        // 최소 및 최대 너비 설정
        var minWidth = 122; // 최소 너비
        var maxWidth = 630; // 최대 너비

        // 너비가 최소값보다 작으면 최소값으로, 최대값보다 크면 최대값으로 설정
        newWidth = Math.max(Math.min(newWidth, maxWidth), minWidth);

        // div의 새 너비 설정
        resizableDiv.style.width = newWidth + 'px';

        function setOpacityByWidth(newWidth) {
            var floor = document.querySelector('.floor');
            var bg = document.querySelector('.bg');
        
            if (newWidth >= 600) {
                floor.style.backgroundColor = "#CCA862";
                bg.style.backgroundColor = "#E0C288";
            } else if (newWidth >= 500) {
                floor.style.backgroundColor = "#E2C07E";
                bg.style.backgroundColor = "#F3D69E";
            } else if (newWidth >= 400) {
                floor.style.backgroundColor = "#F9D48A";
                bg.style.backgroundColor = "#FFEAC3";
            } else if (newWidth >= 300) {
                floor.style.backgroundColor = "#FFE1A4";
                bg.style.backgroundColor = "#FFF3DB";
            }
        }
        //var newWidth = 250;
        setOpacityByWidth(newWidth);
    }

    // 마우스 업 이벤트 처리
    function onMouseUp(event) {
        // 이동 및 업 이벤트 리스너 제거
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // 이벤트 리스너 추가
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});
*/
// div 요소 가져오기
var resizableDiv = document.getElementById('resizableDiv');
var newWidth = 630;
resizableDiv.addEventListener('touchstart', function(event) {
    var startX = event.touches[0].clientX;
    var startWidth = parseInt(document.defaultView.getComputedStyle(resizableDiv).width, 10);

    function onTouchMove(event) {
        var deltaX = event.touches[0].clientX - startX;
        newWidth = startWidth + deltaX;
        var minWidth = 122;
        var maxWidth = 630;

        newWidth = Math.max(Math.min(newWidth, maxWidth), minWidth);
        resizableDiv.style.width = newWidth + 'px';
        setOpacityByWidth(newWidth);
    }

    function onTouchEnd(event) {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
});
var floor = document.querySelector('.floor');
var bg = document.querySelector('.bg');
function setOpacityByWidth(newWidth) {
    

    if (newWidth >= 600) {
        floor.style.backgroundColor = "#CCA862";
        bg.style.backgroundColor = "#E0C288";
    } else if (newWidth >= 500) {
        floor.style.backgroundColor = "#E2C07E";
        bg.style.backgroundColor = "#F3D69E";
    } else if (newWidth >= 400) {
        floor.style.backgroundColor = "#F9D48A";
        bg.style.backgroundColor = "#FFEAC3";
    } else if (newWidth >= 300) {
        floor.style.backgroundColor = "#FFE1A4";
        bg.style.backgroundColor = "#FFF3DB";
    }
}


let isToggled = false;

document.addEventListener("DOMContentLoaded", function() {
    const switchElement = document.querySelector('.switch');
    const contElement_1 = document.querySelector('.opacity');
    const contElement_2 = document.querySelector('.resizable-div');
    const imgElement = switchElement.querySelector('img');

    

    switchElement.addEventListener('click', function() {
        if (isToggled) {
            
            let value1 = 1;
            contElement_1.style.opacity = '0';
            contElement_2.style.filter = `brightness(${value1})`;
            /*if (newWidth > 301) {
                floor.style.backgroundColor = "#CCA862";
                bg.style.backgroundColor = "#E0C288";
            } else if (newWidth < 300) {
                floor.style.backgroundColor = "#FFE1A4";
                bg.style.backgroundColor = "#FFF3DB";
            }*/

            imgElement.src = './images/button_on.svg';
        } else {
            
            let value2 = 0.85;
            contElement_1.style.opacity = '0.2';
            contElement_2.style.filter = `brightness(${value2})`;
            imgElement.src = './images/button_off.svg';
        }
        isToggled = !isToggled;
    });
});

/////////////////////// 성공여부 확인//////////////////////

var targetElement = document.getElementById('resizableDiv');

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        // 요소의 속성 변경을 감지하여 조건 검사
        if (isToggled == true && newWidth <= 200) {
            const mission = document.getElementById("mission");
            const missionBtn = document.getElementById("missionBtn");
            const missionClear = document.getElementById("missionClear");

            missionBtn.style.display = "block";
            mission.style.display = "block";
            missionClear.style.display = "block";
        }
    });
});
var observerConfig = { attributes: true, attributeFilter: ['style'] };
observer.observe(targetElement, observerConfig);

//////////////////////////////////////////////////////////

const ball = document.querySelector('#ball');
const chair = document.querySelector('#chair');

function move_ball(){
    const keyframes = [
        
        { transform: "rotate(-181deg)"},
        { transform: "translateX(-180px)"},
        
        { transform: "translateX(0px)"},
        { transform: "rotate(81deg)"},
        
    ];
    const options = {
        duration: 1000,
        
        easing: "ease-out",
        fill: "forwards",
        //iterations: Infinity,
    };

    ball.animate(keyframes, options);
}

function move_chair(){
    const keyframes = [
        //{ transform: "translateX(200px)", opacity: 1 },
        
        { transform: "rotate(25deg)", opacity: 1 },
        { transform: "rotate(15deg)", opacity: 1 },
        { transform: "rotate(-15deg)", opacity: 1 },
        { transform: "rotate(-20deg)", opacity: 1 },
        { transform: "rotate(10deg)", opacity: 1 },
        { transform: "rotate(-5deg)", opacity: 1 },
        { transform: "rotate(0deg)", opacity: 1 },
        //{ transform: "translateX(300px)", opacity: 1 },
    ];
    const options = {
        duration: 1000,
        easing: "linear",
        fill: "forwards",
        //iterations: Infinity,
    };

    chair.animate(keyframes, options);
}
