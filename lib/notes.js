// const fs = require('fs');

// const path = require('path');
// // const { create } = require('domain');

// function checkNote(note) {
//     if (!note.title || !note.text) {
//         return false;
//     } return true;
// }

// function addNotes(note, notesArray) {
//     notesArray.push(note);
//     fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ notes: notesArray }, null, 2));
//     return note;
// }

// function deleteNotes(notesArray) {
//     fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ notes: notesArray }, null, 2));
// }

// module.exports = {
//     checkNote,
//     addNotes,
//     deleteNotes
// };

const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    getNotes() {
        return this.read().then(notes => {
            let finalNotes;
            try {
                finalNotes = [].concat(JSON.parse(notes))
            }
            catch (err) {
                finalNotes = [];
            }
            return finalNotes;
        })
    }
    addNotes(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Title and/or text are invalid.')
        }
        const newNote = { title, text, id: uuidv1() }
        return this.getNotes().then(notes => [...notes, newNote])
            .then(updatedNote => this.write(updatedNote))
            .then(() => newNote);
    }
    deleteNotes(id) {
        return this.getNotes().then(notes => notes.filter(note => note.id !== id))
            .then(updatedNote => this.write(updatedNote));
    }
}

module.exports = new Notes();