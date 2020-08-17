const fs = require('fs');

const path = require('path');
// const { create } = require('domain');

function checkNote(note) {
    if (!note.title || !note.text) {
        return false;
    } return true;
}

function addNotes(note, notesArray) {
    notesArray.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ notes: notesArray }, null, 2));
    return note;
}

function deleteNotes(notesArray) {
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ notes: notesArray }, null, 2));
}

module.exports = {
    checkNote,
    addNotes,
    deleteNotes
};
