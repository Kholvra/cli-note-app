import fs from "fs/promises";

const NOTE_DIRECTORY = new URL('notes.txt', import.meta.url);

async function readTheFile() {
  const fileContent = await fs.readFile(NOTE_DIRECTORY, "utf-8");
  return fileContent;
}

async function checkFile(argv) {
  try {
    return await readTheFile();
  } catch (err) {
    const error = parseInt(err.errno);
    if (error === -2) {
      await createFile();
      return await readTheFile();
    }
  }
}

async function createFile() {
  try {
    await fs.writeFile(NOTE_DIRECTORY, "");
  } catch (err) {
    console.log(err);
  }
}

export async function addNote(argv) {
  try {
    const newNote = argv;
    if (newNote.note.length<1) throw ('The note name cannot be empty.')
    newNote.id = Date.now();
    const prevFile = await checkFile();
    if (prevFile) {
      const prevFileObj = JSON.parse(prevFile);
      const allNote = [...prevFileObj, newNote];
      await fs.writeFile(NOTE_DIRECTORY, JSON.stringify(allNote));
    } else {
      const allNote = [newNote];
      await fs.writeFile(NOTE_DIRECTORY, JSON.stringify(allNote));
    }
  } catch (err) {
    console.log(err);
  }
}

export async function allNotes() {
  try {
    const notesData = await checkFile();
    if (notesData&&notesData.length>2) {
      const notesDataObj = await JSON.parse(notesData);
      return notesDataObj;
    } else return null;
  } catch (err) {
    console.log(err);
  }
}

export async function filterNote(filterThis) {
  try {
    const notesData = await allNotes();
    if (notesData) {
      const filteredNote = notesData.filter((item) => {
        const theItem = item.note;
        return theItem.includes(filterThis);
      });
      if (filteredNote.length > 0) {
        return filteredNote;
      } else {
        return "tidak ditemukan";
      }
    } else {
      return "tidak ada note";
    }
  } catch (err) {
    console.log(err);
  }
}

export function noteListString(data, argv) {
  let noteList = "";
  if (argv["show-id"]) {
    data.forEach((item, index) => {
      noteList += `${index + 1}. ${item.note}  (${item.id}) \n`;
    });
  } else {
    data.forEach((item, index) => {
      noteList += `${index + 1}. ${item.note}\n`;
    });
  }
  return noteList;
}

export async function removeNote(argv) {
  try {
    const notesData = await allNotes();
    const id = parseInt(argv.id);
    const isRemove = notesData.some((item, index) => {
      if (parseInt(item.id) === id) {
        notesData.splice(index, 1);
        return true;
      }
    });
    isRemove
      ? await fs.writeFile(NOTE_DIRECTORY, JSON.stringify(notesData))
      : console.log("tidak ada id yg sesuai");
  } catch (err) {
    console.log(err);
  }
}