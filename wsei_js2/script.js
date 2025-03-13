let slideIndex = 1;
let autoSlide;

function showSlides(n) {
	let slides = document.getElementsByClassName("slide");
	let dots = document.getElementsByClassName("dot");

	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}

	for (let slide of slides) {
		slide.style.display = "none";
	}

	for (let dot of dots) {
		dot.classList.remove("active");
	}

	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].classList.add("active");
}

function changeSlide(n) {
	clearInterval(autoSlide);
	showSlides((slideIndex += n));
	autoSlide = setInterval(() => changeSlide(1), 5000);
}

function setCurrentSlide(n) {
	clearInterval(autoSlide);
	showSlides((slideIndex = n));
	autoSlide = setInterval(() => changeSlide(1), 5000);
}

// Uruchomienie slidera po załadowaniu strony
window.onload = function () {
	showSlides(slideIndex);
	autoSlide = setInterval(() => changeSlide(1), 5000);
};

// Obsługa przycisków strzałek
document
	.querySelector(".prev")
	.addEventListener("click", () => changeSlide(-1));
document.querySelector(".next").addEventListener("click", () => changeSlide(1));

// Obsługa kropek
document.querySelectorAll(".dot").forEach((dot) => {
	dot.addEventListener("click", function () {
		let slideNum = parseInt(this.getAttribute("data-slide"));
		setCurrentSlide(slideNum);
	});
});
