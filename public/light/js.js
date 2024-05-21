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
        var maxWidth = 850; // 최대 너비

        // 너비가 최소값보다 작으면 최소값으로, 최대값보다 크면 최대값으로 설정
        newWidth = Math.max(Math.min(newWidth, maxWidth), minWidth);

        // div의 새 너비 설정
        resizableDiv.style.width = newWidth + 'px';
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




document.addEventListener("DOMContentLoaded", function() {
    const switchElement = document.querySelector('.switch');
    const contElement_1 = document.querySelector('.opacity');
    const contElement_2 = document.querySelector('.resizable-div');
    const imgElement = switchElement.querySelector('img');

    let isToggled = false;

    switchElement.addEventListener('click', function() {
        if (isToggled) {
            let value1 = 1;
            contElement_1.style.opacity = '0';
            contElement_2.style.filter = `brightness(${value1})`;
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
