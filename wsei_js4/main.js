document.addEventListener("DOMContentLoaded", () => {
	const noteForm = document.getElementById("noteForm");
	const notesContainer = document.getElementById("notesContainer");

	function getNotes() {
		return JSON.parse(localStorage.getItem("notes")) || [];
	}

	function saveNotes(notes) {
		localStorage.setItem("notes", JSON.stringify(notes));
		renderNotes();
	}

	function renderNotes() {
		notesContainer.innerHTML = "";
		let notes = getNotes();

		notes.sort((a, b) => {
			if (b.pinned !== a.pinned) return b.pinned - a.pinned;
			return new Date(b.createdDate) - new Date(a.createdDate);
		});

		notes.forEach((note, index) => {
			const noteElement = document.createElement("div");
			noteElement.classList.add("note");
			noteElement.style.backgroundColor = note.color;

			noteElement.innerHTML = `
                <div class="note-header">
                    <button class="pin-btn">${
											note.pinned ? "📌 Odepnij" : "📍 Przypnij"
										}</button>
                    <button class="delete-btn">❌ Usuń</button>
                </div>
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <small>${new Date(note.createdDate).toLocaleString()}</small>
            `;

			noteElement.querySelector(".delete-btn").addEventListener("click", () => {
				notes.splice(index, 1);
				saveNotes(notes);
			});

			noteElement.querySelector(".pin-btn").addEventListener("click", () => {
				notes[index].pinned = !notes[index].pinned;
				saveNotes(notes);
			});

			notesContainer.appendChild(noteElement);
		});
	}

	noteForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const title = document.getElementById("title").value;
		const content = document.getElementById("content").value;
		const color = document.getElementById("color").value;
		const pinned = document.getElementById("pinned").checked;

		const newNote = {
			title,
			content,
			color,
			pinned,
			createdDate: new Date().toISOString(),
		};

		const notes = getNotes();
		notes.push(newNote);
		saveNotes(notes);

		noteForm.reset();
	});

	renderNotes();
});
