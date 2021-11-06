let operations = [];
let score = 0;
let diffInc = 1;
let question = {};
let answer;
let time = 10000;
let maxTime = 10000;
let timerDecrease;
function start() {
    if (document.getElementById("diffInc").value == 0) {
        diffInc = 1;
    } else {
        diffInc = Number(document.getElementById("diffInc").value);
    }
    for (let i = 1; i <= 6; i++) {
        operations[i - 1] = document.getElementById(String(i)).checked;
    }
    console.log(operations);
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "";
    newQuestion();
}
function newQuestion() {
    timerDecrease = setInterval(function() {
        time -= 20;
        if (time <= 0) {
            clearInterval(timerDecrease);
            score -= diffInc;
            if (score <= 0) {
                score = 0;
            }
            maxTime *= 1.1;
            document.getElementById("timer").max = maxTime;
            time = maxTime;
            document.getElementById("score").innerText = "Score: " + String(score);
            newQuestion();
        }
        document.getElementById("timerText").innerText = (time / 1000).toFixed(1) + "s";
        document.getElementById("timer").value = time;
    }, 20);
    if (score >= 3000) {
        alert("You win!");
        window.close();
    }
    question = {};
    let html = document.getElementById("question");
    while (!operations[question.operation]) {
        question.operation = Math.floor(Math.random() * 6);
    }
    changeParts();
    if (question.operation === 0) {
        while (question.part1 + question.part2 !== Math.round(question.part1 + question.part2)) {
            changeParts();
        }
        question.answer = question.part1 + question.part2;
        html.innerHTML = question.part1 + " + " + question.part2;
    } else if (question.operation === 1) {
        while (question.part1 - question.part2 !== Math.round(question.part1 - question.part2)) {
            changeParts();
        }
        question.answer = question.part1 - question.part2;
        html.innerHTML = question.part1 + " - " + question.part2;
    } else if (question.operation === 2) {
        question.answer = question.part1 * question.part2;
        html.innerHTML = question.part1 + " × " + question.part2;
    } else if (question.operation === 3) {
        if (score <= 20) {
            while (question.part1 / question.part2 !== Math.round(question.part1 / question.part2)) {
                changeParts();
            }
        }
        question.answer = question.part1 / question.part2;
        html.innerHTML = question.part1 + " ÷ " + question.part2;
    } else if (question.operation === 4) {
        question.answer = question.part1 ** (Math.floor(question.part2 / 10) + 1);
        html.innerHTML = question.part1 + "<sup>" + (Math.floor(question.part2 / 10) + 1);
    } else if (question.operation === 5) {
        if (score <= 20) {
            while (question.part2 ** (1 / (Math.floor(question.part1 / 10) + 2)) !== Math.round(question.part2 ** (1 / (Math.floor(question.part1 / 10) + 2)))) {
                changeParts();
            }
        }
        question.answer = question.part2 ** (1 / (Math.floor(question.part1 / 10) + 2));
        if ((Math.floor(question.part1 / 10) + 2) === 2) {
            html.innerHTML = "√" + question.part2;
        } else {
            html.innerHTML = "<sup>" + (Math.floor(question.part1 / 10) + 2) + "</sup>√" + question.part2;
        }
    }
    answer = question.answer;
    if (answer === Infinity) {
        newQuestion();
    }
    console.log(question);
}
function changeParts() {
    question.part1 = Math.floor(Math.random() * (2 ** ((score / 3) + 1) / (question.operation + 1) / 2) + 1);
    question.part2 = Math.floor(Math.random() * (2 ** ((score / 3) + 1) / (question.operation + 1) / 2) + 1);
}
function submit() {
    if (Math.round(Number(document.getElementById("answer").value * 10)) / 10 === Math.round(answer * 10) / 10) {
        clearInterval(timerDecrease);
        maxTime /= 1.1;
        time = maxTime;
        document.getElementById("timer").max = maxTime;
        score += diffInc;
        document.getElementById("score").innerText = "Score: " + String(score);
        newQuestion();
    } else {
        score -= diffInc;
        if (score <= 0) {
            score = 0;
        }
        maxTime *= 1.1;
        time = maxTime;
        newQuestion();
    }
}
document.onkeypress = function(key) {
    if (key.key === "Enter") {
        submit();
    }
}