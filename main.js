let operations = [];
let score = 0;
let diffInc = 1;
let question = {};
let answer;
function start() {
    diffInc = Number(document.getElementById("diffInc").value);
    for (let i = 1; i <= 6; i++) {
        operations[i - 1] = document.getElementById(String(i)).checked;
    }
    console.log(operations);
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "";
    newQuestion();
}
function newQuestion() {
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
        score += diffInc;
        document.getElementById("score").innerText = "Score: " + String(score);
        newQuestion();
    } else {
        alert("Incorrect! Final score: " + score);
    }
}
document.onkeypress = function(key) {
    if (key.key === "Enter") {
        submit();
    }
}