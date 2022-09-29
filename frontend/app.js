const form = document.querySelector("form");
const titleInput = document.querySelector(".title-input");
const textInput = document.querySelector("textarea");
const importantCheckbox = document.querySelector(".checkbox");
const notesContainer = document.querySelector(".notes-container");

getNotes();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");

  const newNote = {
    title: titleInput.value,
    text: textInput.value,
    important: importantCheckbox.checked,
  };

  postNote(newNote);

  // Clear inputs
  titleInput.value = "";
  textInput.value = "";
});

// Fetch notes
async function getNotes() {
  const resp = await fetch("http://localhost:3000/notes");
  const data = await resp.json();

  console.log(data);

  data.notes.forEach((note) => {
    createNote(note.title, note.text, note.id, note.important);
  });
}

// Create note
function createNote(title, text, id, important) {
  const newNote = document.createElement("div");
  newNote.classList.add("note-preview-item");
  newNote.setAttribute("data-id", id);

  if (important) {
    newNote.classList.add("important");
  }

  newNote.innerHTML = `
        <p class="note-preview-title">${title}</p>
        <p class="note-preview">${text}</p>
        <button onclick="handleDelete(event)" class="delete-btn" title="delete">&times;</button>
  `;

  notesContainer.appendChild(newNote);
}

// Post new note
async function postNote(note) {
  const postReq = await fetch("http://localhost:3000/new-post", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  const resp = await postReq.json();

  console.log(resp);
}

async function deleteNote(noteId) {
  const deleteReq = await fetch(`http://localhost:3000/delete-item/${noteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const resp = await deleteReq.json();

  console.log(resp);
}

function handleDelete(e) {
  const noteId = e.target.parentNode.getAttribute("data-id");

  console.log(noteId);

  deleteNote(noteId);
}
