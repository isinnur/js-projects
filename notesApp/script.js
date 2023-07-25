const search_notes = document.querySelector('.note-filter');
const add_btn = document.querySelector('.add-btn');
const save_btn = document.querySelector('.save-btn');
//right 
const new_note_title = document.querySelector('.notes-title');
const new_note = document.querySelector('.notes-text');
//left
const note_title = document.querySelector('.title');
const notes_area = document.querySelector('.textarea');

const left_side = document.querySelector('left-side');
const right_side = document.querySelector('.right-side');
const notes_container = document.querySelector('.notes-container');

let editingNote = null;


const newNote = () => {

    save_btn.addEventListener('click', () => {
        const title = note_title.value;
        console.log(title);

        const text = notes_area.value;
        console.log(text);

        if (!editingNote) {
            addNote(title, text);
            saveLocal(title, text);
        } else {
            updateNote();
        }
        right_side.classList.add('show');
    });
    editNote();
}

const addNote = (title, text) => {
    const newTextArea = document.createElement('div')
    newTextArea.classList.add('notes');

    const sectionArea = document.createElement('section');


    const newTitle = document.createElement('h2');
    newTitle.innerHTML = title;

    const newText = document.createElement('p');
    newText.innerHTML = text;

    sectionArea.appendChild(newTitle);
    sectionArea.appendChild(newText);


    newTextArea.appendChild(sectionArea);

    //iconlar
    const newIcons = document.createElement('div');
    newIcons.classList.add('icons');

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    deleteIcon.style.color = '#e3f2fd';

    const upIcon = document.createElement('i');
    upIcon.classList.add('fa-solid', 'fa-caret-up');
    upIcon.style.color = '#e3f2fd';

    const downIcon = document.createElement('i');
    downIcon.classList.add('fa-solid', 'fa-caret-down');
    downIcon.style.color = '#e3f2fd';

    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    editIcon.style.color = '#e3f2fd';

    const div = document.createElement('div');
    newIcons.appendChild(deleteIcon);
    newIcons.appendChild(editIcon);
    div.appendChild(upIcon);
    div.appendChild(downIcon);

    newIcons.appendChild(div);
    newTextArea.appendChild(newIcons);
    //hepsini ekler
    notes_container.appendChild(newTextArea);
}

const resetState = () => {
    note_title.value = '';
    notes_area.value = '';
}

const editNote = () => {
    notes_container.addEventListener('click', (event) => {
        const clickedEditIcon = event.target.closest('.fa-pen-to-square');
        if (clickedEditIcon) {
            right_side.classList.remove('show');
            const clickedNote = clickedEditIcon.closest('.notes');

            if (clickedNote) {
                const noteTitle = clickedNote.querySelector('h2').innerText;
                const noteText = clickedNote.querySelector('p').innerText;

                note_title.value = noteTitle;
                notes_area.value = noteText;

                editingNote = clickedNote;
            }
        }
    })
}

const updateLocal = (oldTitle, oldText, newTitle, newText) => {
    const notesData = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notesData.map((note) => {
        if (note.title === oldTitle && note.text === oldText) {
            return { title: newTitle, text: newText };
        }
        return note;
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
};

const updateNote = () => {
    if (!editingNote) return;
    const newTitle = note_title.value;
    const newText = notes_area.value;

    const oldTitle = editingNote.querySelector('h2').innerText;
    const oldText = editingNote.querySelector('p').innerText;

    editingNote.querySelector('h2').innerText = newTitle;
    editingNote.querySelector('p').innerText = newText;

    updateLocal(oldTitle, oldText, newTitle, newText);

    //düzenleme bitincce sıfırla
    editingNote = null;
}

const AddNewBtn = () => {
    add_btn.addEventListener('click', () => {
        right_side.classList.remove('show2');
        right_side.classList.remove('show');
        resetState();
    })

}

const actionsIcons = () => {
    notes_container.addEventListener('click', (event) => {
        if (event.target.classList.contains('fa-trash')) {
            deleteBtn(event);
        }
        else if (event.target.classList.contains('fa-caret-up')) {
            upBtn(event);
        }
        else if (event.target.classList.contains('fa-caret-down')) {
            downBtn(event);
        }
    });
}


const removeLocal = (title, text) => {
    const notesData = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotesData = notesData.filter(
        (note) => note.title !== title && note.text !== text
    );
    localStorage.setItem('notes', JSON.stringify(updatedNotesData));
}

const deleteBtn = (event) => {
    right_side.classList.add('show2');
    const clickedNote = event.target.closest('.notes');
    clickedNote.remove();

    const noteTitle = clickedNote.querySelector('h2').innerText;
    const noteText = clickedNote.querySelector('p').innerText;
    // Remove note from localStorage
    removeLocal(noteTitle, noteText);
}

const updateNotesOrderInLocalStorage = () => {
    const notesData = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = Array.from(notes_container.querySelectorAll('.notes')).map((noteElement) => {
        const title = noteElement.querySelector('h2').innerText;
        const text = noteElement.querySelector('p').innerText;
        return { title, text };
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
};


const upBtn = (event) => {
    //yakın üst soyunu bul clickedNote ata
    const clickedNote = event.target.closest('.notes');
    //önceki kardeşini prevNote ata
    const prevNote = clickedNote.previousElementSibling;


    if (prevNote) {
        //tıklananı öncesine ekler
        notes_container.insertBefore(clickedNote, prevNote);
        updateNotesOrderInLocalStorage();
    }
}

const downBtn = (event) => {
    const clickedNote = event.target.closest('.notes');
    const nextNote = clickedNote.nextElementSibling;
    if (nextNote) {
        notes_container.insertBefore(nextNote, clickedNote);
        updateNotesOrderInLocalStorage();
    } else {
        //yoksa sonuna ekler
        notes_container.appendChild(clickedNote);
        updateNotesOrderInLocalStorage();
    }
}


const searchNotes = () => {
    search_notes.addEventListener('input', () => {
        //boşlukları kaldır küçük harf yap
        const searchTerm = search_notes.value.trim().toLowerCase();
        const allNotes = notes_container.querySelectorAll('.notes');

        allNotes.forEach((note) => {
            const noteTitle = note.querySelector('h2').innerText.toLowerCase();
            const noteText = note.querySelector('p').innerText.toLowerCase();
            const sameNote = noteTitle.includes(searchTerm) || noteText.includes(searchTerm);

            if (sameNote) {
                note.style.display = 'block';
            } else {
                note.style.display = 'none';
            }
        });
    });
}




//LOCALSTORAGE
const saveLocal = (title, text) => {
    const notesData = JSON.parse(localStorage.getItem('notes')) || [];
    notesData.push({ title, text });
    localStorage.setItem('notes', JSON.stringify(notesData));
};

const loadLocal = () => {
    const notesData = JSON.parse(localStorage.getItem('notes')) || [];
    notesData.forEach((noteData) => {
        addNote(noteData.title, noteData.text);
    });
};


loadLocal();
actionsIcons();
searchNotes();
AddNewBtn();
newNote();
