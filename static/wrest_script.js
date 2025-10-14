function updateTotalScore(teamColor, score1Id, score2Id, opponentScore3Id) {
    let score1Value = parseInt(document.getElementById(score1Id).value);
    let score2Value = parseInt(document.getElementById(score2Id).value);
    let opponentScore3Value = parseInt(document.getElementById(opponentScore3Id).value);

    let totalScore = score1Value * 1 + score2Value * 3 + opponentScore3Value * 1;
    document.getElementById(teamColor + '-total-score').innerText = totalScore;
}

function manualScoreUpdate(teamColor) {
    let score1Id = teamColor + '-score1';
    let score2Id = teamColor + '-score2';
    let score3Id = teamColor + '-score3';
    let opponentTeamColor = (teamColor === 'blue' ? 'red' : 'blue');
    let opponentScore3Id = opponentTeamColor + '-score3';

    // 更新雙方的總分
    updateTotalScore(teamColor, score1Id, score2Id, opponentScore3Id);
    updateTotalScore(opponentTeamColor, opponentTeamColor + '-score1', opponentTeamColor + '-score2', score3Id);

    // 檢查分數差
    checkScoreDifferenceAndStopTimer();
}

function stopTimerAndHighlight() {
    clearInterval(timerInterval);  // 停止计时器
    isTimerRunning = false;
    document.querySelector('.timer').style.backgroundColor = 'red';  // 设置计时器背景为红色
    showRefreshButton();
    determineWinner(); // 计时器到0时确定胜利者
}

function determineWinner() {
    let blueScore = parseInt(document.getElementById('blue-total-score').innerText);
    let redScore = parseInt(document.getElementById('red-total-score').innerText);
    
    let blueScore1 = parseInt(document.getElementById('blue-score1').value);
    let blueScore2 = parseInt(document.getElementById('blue-score2').value);
    let blueScore3 = parseInt(document.getElementById('blue-score3').value);

    let redScore1 = parseInt(document.getElementById('red-score1').value);
    let redScore2 = parseInt(document.getElementById('red-score2').value);
    let redScore3 = parseInt(document.getElementById('red-score3').value);

    // 初始化赢家为null
    let winner = null;

    if (blueScore > redScore) {
        winner = 'blue';
    } else if (redScore > blueScore) {
        winner = 'red';
    } else {
        // 如果总分相同，比较警告数
        if (blueScore3 < redScore3) {
            winner = 'blue';
        } else if (redScore3 < blueScore3) {
            winner = 'red';
        } else {
            // 如果警告数相同，比较3分数
            if (blueScore2 > redScore2) {
                winner = 'blue';
            } else if (redScore2 > blueScore2) {
                winner = 'red';
            } else {
                // 如果3分数相同，比较1分数
                if (blueScore1 > redScore1) {
                    winner = 'blue';
                } else if (redScore1 > blueScore1) {
                    winner = 'red';
                } else {
                    // 如果所有分数都相同，最后得分者获胜
                    let lastScored = getLastScoredTeam();
                    winner = lastScored;
                }
            }
        }
    }

    // 显示胜利者的皇冠
    if (winner) {
        let confirmation = confirm("是否顯示王冠？");
            if (confirmation) {
                document.querySelector(`.${winner} .crown-icon`).style.display = 'inline';
            } else {
                pass;
            }
    }
}

function getLastScoredTeam() {
    // 假设 lastScoredTeam 是记录最后得分者的变量
    // 你需要在每次更新分数时跟踪这个变量
    return lastScoredTeam; // 'blue' 或 'red'
}

let lastScoredTeam = null;

function incrementCorrespondingCell(index, element, teamColor) {
    let score1Id = teamColor + '-score1';
    let score2Id = teamColor + '-score2';
    let score3Id = teamColor + '-score3';
    let opponentTeamColor = (teamColor === 'blue' ? 'red' : 'blue');
    let opponentScore3Id = opponentTeamColor + '-score3';

    let scoreInputId = teamColor + '-score' + (index + 1);
    let scoreInputElement = document.getElementById(scoreInputId);
    let currentValue = parseInt(scoreInputElement.value);
    scoreInputElement.value = currentValue + 1;

    // 记录最后得分者
    if (index != 2){
        lastScoredTeam = teamColor
    }
    // 更新双方的总分
    updateTotalScore(teamColor, score1Id, score2Id, opponentScore3Id);
    updateTotalScore(opponentTeamColor, opponentTeamColor + '-score1', opponentTeamColor + '-score2', score3Id);

    // 检查分数差
    checkScoreDifferenceAndStopTimer();
}

// 其他函数保持不变

function checkScoreDifferenceAndStopTimer() {
    let blueScore = parseInt(document.getElementById('blue-total-score').innerText);
    let redScore = parseInt(document.getElementById('red-total-score').innerText);

    if (Math.abs(blueScore - redScore) >= 8) {
        stopTimerAndHighlight();
    }
}

function toggleLeader(element) {
    if (element.innerText === "") {
        element.innerText = "領先方";
        element.style.backgroundColor = "yellow";
        element.style.color = "black";
    } else {
        element.innerText = "";
        element.style.backgroundColor = "";
        element.style.color = "black";
    }
}
let timerInterval;
let isTimerRunning = false;
let timeRemaining = 240;

function incrementScore(element) {
    let score = parseInt(element.innerText);
    element.innerText = score + 1;
}



function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
    } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        stopTimerAndHighlight();
    }
}


function updateTimerDisplay() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    document.querySelector('.timer').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
    } else {
        timerInterval = setInterval(updateTimer, 1000);
    }
    isTimerRunning = !isTimerRunning;
}

function setTimer(minutes, seconds) {
    timeRemaining = minutes * 60 + seconds;
    updateTimerDisplay();
}

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

function showRefreshButton() {
    document.querySelector('.refresh-button').style.display = 'inline';
}
function refreshPage() {
    window.location.reload();
}