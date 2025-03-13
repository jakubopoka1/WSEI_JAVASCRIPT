const clapSound = document.querySelector("#clap");
const hihatSound = document.querySelector("#hihat");
const kickSound = document.querySelector("#kick");

const sounds = {
	a: clapSound,
	s: hihatSound,
	d: kickSound,
};

const channel1 = [];
document.addEventListener("keypress", (event) => {
	channel1.push({
		key: event.key,
		time: Date.now(),
	});
	playSound(sounds[event.key]);
});

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}
