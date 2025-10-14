let timerInterval;
let isTimerRunning = false;
let timeRemaining = 240;

// 設定時間 input int,int
function setTimer(minutes, seconds) {
timeRemaining = minutes * 60 + seconds;
updateTimerDisplay();
}

// 修改時間 使用者Input int:int
function openSettings() {
let timeInput = prompt("請輸入倒數時間 (格式: MM:SS)", "5:00");
if (timeInput) {
    let timerParts = timeInput.split(':');
    let minutes = parseInt(timerParts[0]);
    let seconds = parseInt(timerParts[1]);
    if (!isNaN(minutes) && !isNaN(seconds)) {
        setTimer(minutes, seconds);
    } else {
        alert("請輸入有效的時間格式");
    }
}
}

document.querySelector('.timer').addEventListener('dblclick', function() {
openSettings();
});

// timer
function incrementTimer() {
timeRemaining++;
updateTimerDisplay();
}

let intervals = {};

// 擊倒時間
function takedownIncrement(elementId, opponentScoreElement) {
let element = document.getElementById(elementId);

// 如果计时器正在运行，则停止计时并将分数重置为0
if (intervals[elementId]) {
    clearInterval(intervals[elementId]);
    intervals[elementId] = null;
    element.innerText = '0';  // 将分数重置为0
} else {
    // 如果计时器没有运行，则启动计时器并每秒增加分数
    intervals[elementId] = setInterval(function() {
        let score = parseInt(element.innerText, 10);  // 将目前分数转为十进制
        score += 1;  // 分数增加1
        element.innerText = score;  // 更新分数显示

        // 在分数达到10和20时，触发对方的incrementScore
        if (score === 10 || score === 20) {
            incrementScore(opponentScoreElement);
        }
        if (score >= 20) {
            clearInterval(intervals[elementId]);
            intervals[elementId] = null;
        }

    }, 1000);  // 每秒增加1
}
}

function incrementScore(element) {
let score = parseInt(element.innerText, 2);  // 將內部文本作為二進制數字解析
score += 1;  // 將分數增加1
element.innerText = score.toString(2);  // 將分數轉換為二進制字符串並更新顯示

// 當分數達到 10 或 11 時觸發閃爍效果
if (score === 2 || score === 3) {
    element.classList.add('blink');
    stopTimerAndHighlight();  // 停止計時器並變紅
    
    showRefreshButton();
    showCrown(element);
}
}


function toggleYellowBoxes(className, opponentScoreElement) {
const yellowBoxes = document.querySelectorAll(`.${className} .yellow-box`);
const redBox = document.querySelector(`.${className} .red-box`);
let visibleYellowCount = Array.from(yellowBoxes).filter(box => box.style.visibility === 'visible').length;

if (visibleYellowCount < yellowBoxes.length) {
    yellowBoxes[visibleYellowCount].style.visibility = 'visible';
} else if (redBox && redBox.style.visibility !== 'visible') {
    redBox.style.visibility = 'visible';
    // 當紅牌顯示時，對手分數增加兩次
    incrementScore(opponentScoreElement);
    incrementScore(opponentScoreElement);
} else {
    yellowBoxes.forEach(box => box.style.visibility = 'hidden');
    if (redBox) {
        redBox.style.visibility = 'hidden';
    }
}
}


function updateTimer() {
if (timeRemaining > 0) {
    timeRemaining--;
    updateTimerDisplay();
} else if (timeRemaining === 0) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    determineWinnerOrContinue();
}
}

function determineWinnerOrContinue() {
let player1Score = parseInt(document.querySelector('.player-a .score-box').innerText, 2);
let player2Score = parseInt(document.querySelector('.player-b .score-box').innerText, 2);

if (player1Score > player2Score) {
    
    stopTimerAndHighlight();
    showRefreshButton();
    showCrown(document.querySelector('.player-a .score-box'));
} else if (player2Score > player1Score) {
    
    stopTimerAndHighlight();
    showRefreshButton();
    showCrown(document.querySelector('.player-b .score-box'));
} else {
    // 分數相同，重新開始正向計時
    startPositiveTimer();
    document.querySelector('.gs-text').style.display = 'inline';
}
}

function startPositiveTimer() {
timeRemaining = 1;  // 将时间重置为 0
clearInterval(timerInterval);  // 清除原有的倒計時器
updateTimerDisplay();
timerInterval = setInterval(function() {
    timeRemaining++;
    updateTimerDisplay();
}, 1000);
isTimerRunning = true;  // 設置計時狀態為運行中
}

function updateTimerDisplay() {
let minutes = Math.floor(timeRemaining / 60);
let seconds = timeRemaining % 60;
document.querySelector('.timer').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
let timerElement = document.querySelector('.timer');
if (isTimerRunning) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerElement.style.color = 'white';  // 暫停時變為白色
} else {
    timerInterval = setInterval(updateTimer, 1000);
    timerElement.style.color = '';  // 恢復原來顏色
}
isTimerRunning = !isTimerRunning;
}

function stopTimerAndHighlight() {
clearInterval(timerInterval);  // 停止計時器
isTimerRunning = false;  // 設置計時狀態為非運行中
let timerElement = document.querySelector('.timer');
timerElement.style.backgroundColor = 'red';
}

function showCrown(element) {
let playerDiv = element.closest('.players');
let crownIcon = playerDiv.querySelector('.crown-icon');

if (crownIcon) {
    // crownIcon.style.display = 'inline';  // 顯示王冠

    // 延遲 500 毫秒後才觸發 confirm 彈窗
    setTimeout(function() {
        let confirmation = confirm("是否顯示王冠？");
        if (confirmation) {
            crownIcon.style.display = 'inline';
            // 如果用戶選擇 "確定"，可以進行更多操作，例如增加一個提示或執行某些動作
            console.log("顯示王冠");
        } else {
            // 如果用戶選擇 "取消"，可以進行其他操作
            console.log("取消顯示王冠");
        }
    }, 500);  // 500 毫秒的延遲
} else {
    console.error("Crown icon not found in the player's element.");
}
}


function showRefreshButton() {
const refreshButton = document.querySelector('.refresh-button');
if (refreshButton) {
    refreshButton.style.display = 'inline';  // 顯示重新整理按鈕
} else {
    console.error("Refresh button not found in the document.");
}
}

function refreshPage() {
window.location.reload();
}