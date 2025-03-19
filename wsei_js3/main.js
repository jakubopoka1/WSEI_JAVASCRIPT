const clapSound = document.querySelector("#clap");
const hihatSound = document.querySelector("#hihat");
const kickSound = document.querySelector("#kick");

const sounds = {
	a: clapSound,
	s: hihatSound,
	d: kickSound,
};

const channels = [[], [], [], []];
let isRecording = [false, false, false, false];
let startTime = 0;

document.addEventListener("keypress", (event) => {
	if (sounds[event.key]) {
		playSound(sounds[event.key]);
		recordSound(event.key);
	}
});

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

function recordSound(key) {
	const time = Date.now() - startTime;
	isRecording.forEach((recording, index) => {
		if (recording) {
			channels[index].push({ key, time });
		}
	});
}

function startRecording(channel) {
	channels[channel] = [];
	isRecording[channel] = true;
	startTime = Date.now();
}

function stopRecording(channel) {
	isRecording[channel] = false;
}

function playChannel(channel) {
	channels[channel].forEach((note) => {
		setTimeout(() => {
			playSound(sounds[note.key]);
		}, note.time);
	});
}

function playAllChannels() {
	channels.forEach((channel) => {
		channel.forEach((note) => {
			setTimeout(() => playSound(sounds[note.key]), note.time);
		});
	});
}

document
	.querySelector("#record1")
	.addEventListener("click", () => startRecording(0));
document
	.querySelector("#stop1")
	.addEventListener("click", () => stopRecording(0));
document
	.querySelector("#play1")
	.addEventListener("click", () => playChannel(0));

document
	.querySelector("#record2")
	.addEventListener("click", () => startRecording(1));
document
	.querySelector("#stop2")
	.addEventListener("click", () => stopRecording(1));
document
	.querySelector("#play2")
	.addEventListener("click", () => playChannel(1));

document
	.querySelector("#record3")
	.addEventListener("click", () => startRecording(2));
document
	.querySelector("#stop3")
	.addEventListener("click", () => stopRecording(2));
document
	.querySelector("#play3")
	.addEventListener("click", () => playChannel(2));

document
	.querySelector("#record4")
	.addEventListener("click", () => startRecording(3));
document
	.querySelector("#stop4")
	.addEventListener("click", () => stopRecording(3));
document
	.querySelector("#play4")
	.addEventListener("click", () => playChannel(3));

document.querySelector("#playAll").addEventListener("click", playAllChannels);
