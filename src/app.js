const form = document.querySelector("#note-form");
const titleInput = document.querySelector("#note-title");
const contentInput = document.querySelector("#note-content");
const searchInput = document.querySelector("#search");
const notesContainer = document.querySelector("#notes");

let notes = JSON.parse(localStorage.getItem("aurora-notes") || "[]");

function save() {
  localStorage.setItem("aurora-notes", JSON.stringify(notes));
}

function render() {
  const term = searchInput.value.toLowerCase();
  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(term) ||
    note.content.toLowerCase().includes(term)
  );

  notesContainer.innerHTML = filtered.map(note => `
    <article class="note">
      <h2>${note.title}</h2>
      <p>${note.content}</p>
    </article>
  `).join("");
}

form.addEventListener("submit", event => {
  event.preventDefault();
  notes.unshift({
    title: titleInput.value.trim(),
    content: contentInput.value.trim()
  });
  save();
  form.reset();
  render();
});

searchInput.addEventListener("input", render);
render();
