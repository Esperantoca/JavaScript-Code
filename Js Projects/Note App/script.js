const newNoteBtn = document.getElementById("newNote");
const keepNote = JSON.parse(localStorage.getItem("notes"));

if (keepNote) {
    keepNote.forEach((item) => {
        addNewNote(item);
    });
}

newNoteBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `<div class="notes">
    <div class="tools">
        <button class="add">
        <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
        <i class="fas fa-trash-alt"></i>
        </button>
        </div>
    <div class="notePage ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    </div> `;

    const addBtn = note.querySelector(".add");
    const deleteBtn = note.querySelector(".delete");

    const notePage = note.querySelector(".notePage");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    notePage.innerHTML = marked(text);

    addBtn.addEventListener("click", () => {
        notePage.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();
        updateLocalStorage();

    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        notePage.innerHTML = marked(value);
        updateLocalStorage();
    });

    document.body.appendChild(note);
}

function updateLocalStorage() {
    const writeNote = document.querySelectorAll("textarea");

    const writtenNote = [];

    writeNote.forEach((note) => {
        writtenNote.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(writtenNote));
}