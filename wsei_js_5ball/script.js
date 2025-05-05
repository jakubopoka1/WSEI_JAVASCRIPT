const ball = document.getElementById("ball");
const hole = document.getElementById("hole");
const timerDisplay = document.getElementById("timer");
const recordsDisplay = document.getElementById("records");

const ballSize = 40;
const holeSize = 60;

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let startTime;
let timerInterval;

function startTimer() {
	startTime = Date.now();
	timerInterval = setInterval(() => {
		const elapsed = (Date.now() - startTime) / 1000;
		timerDisplay.textContent = `Czas: ${elapsed.toFixed(2)}s`;
	}, 100);
}

function stopTimer() {
	clearInterval(timerInterval);
	const finalTime = (Date.now() - startTime) / 1000;
	timerDisplay.textContent = `Czas: ${finalTime.toFixed(2)}s`;
	saveRecord(finalTime);
}

function saveRecord(time) {
	let records = JSON.parse(localStorage.getItem("records")) || [];
	records.push(time);
	records.sort((a, b) => a - b);
	records = records.slice(0, 10);
	localStorage.setItem("records", JSON.stringify(records));
	renderRecords();
}

function renderRecords() {
	const records = JSON.parse(localStorage.getItem("records") || "[]");
	recordsDisplay.innerHTML =
		"<strong>Records:</strong><br>" +
		records.map((r) => `${r.toFixed(2)}s`).join("<br>");
}

function resetGame() {
	x = window.innerWidth / 2;
	y = window.innerHeight / 2;
	ball.style.left = `${x - ballSize / 2}px`;
	ball.style.top = `${y - ballSize / 2}px`;

	const holeX = Math.random() * (window.innerWidth - holeSize);
	const holeY = Math.random() * (window.innerHeight - holeSize);
	hole.style.left = `${holeX}px`;
	hole.style.top = `${holeY}px`;
}

function checkCollision() {
	const ballRect = ball.getBoundingClientRect();
	const holeRect = hole.getBoundingClientRect();

	const overlap = !(
		ballRect.right < holeRect.left ||
		ballRect.left > holeRect.right ||
		ballRect.bottom < holeRect.top ||
		ballRect.top > holeRect.bottom
	);

	if (overlap) {
		stopTimer();
		setTimeout(() => {
			alert("Zajebista robota bratku!");
			resetGame();
			startTimer();
		}, 100);
	}
}

window.addEventListener("deviceorientation", (event) => {
	if (!startTime) startTimer();

	const speed = 2;
	x += event.gamma * speed;
	y += event.beta * speed;

	x = Math.max(0, Math.min(window.innerWidth - ballSize, x));
	y = Math.max(0, Math.min(window.innerHeight - ballSize, y));

	ball.style.left = `${x}px`;
	ball.style.top = `${y}px`;

	checkCollision();
});

window.addEventListener("load", () => {
	resetGame();
	renderRecords();
});
