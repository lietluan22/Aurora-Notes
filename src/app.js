const noteForm = document.getElementById("note-form");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const notesList = document.getElementById("notes-list");
const emptyMessage = document.getElementById("empty-message");

let notes = JSON.parse(localStorage.getItem("aurora-notes")) || [];

function saveNotes() {
  localStorage.setItem("aurora-notes", JSON.stringify(notes));
}

function renderNotes() {
  notesList.innerHTML = "";

  if (notes.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.className = "note";

    const title = document.createElement("h3");
    title.textContent = note.title;

    const content = document.createElement("p");
    content.textContent = note.content;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", () => removeNote(note.id));

    li.appendChild(title);
    li.appendChild(content);
    li.appendChild(deleteButton);
    notesList.appendChild(li);
  });
}

function addNote(event) {
  event.preventDefault();

  const newNote = {
    id: Date.now(),
    title: noteTitle.value.trim(),
    content: noteContent.value.trim()
  };

  notes.push(newNote);
  saveNotes();
  renderNotes();

  noteForm.reset();
  noteTitle.focus();
}

function removeNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

noteForm.addEventListener("submit", addNote);
renderNotes();
