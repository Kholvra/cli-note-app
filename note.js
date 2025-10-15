#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs/promises";
import * as noteTool from "./noteTool.js";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note to create",
      });
    },
    async (argv) => {
      try {
        await noteTool.addNote(argv);
      } catch (err) {
        console.log(err);
      }
    }
  )
  .options("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      try {
        const noteData = await noteTool.allNotes();
        if (noteData) {
          console.log(noteTool.noteListString(noteData,argv));
        } else console.log("tidak ada note");
      } catch (err) {
        console.log(err);
      }
    }
  )
  .options("showId", {
    type: "boolean",
    alias: "i",
    description: "showing note id",
  })
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const filteredNote = await noteTool.filterNote(argv.filter);
      console.log(filteredNote);
    }
  )
  .command(
    "remove <id>",
    "remove note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      await noteTool.removeNote(argv)
    }
  )
  // devonly
  .command(
    "deleteFile",
    "remove note data file",
    () => {},
    async () => {
      try {
        await fs.unlink("notes.txt");
      } catch (err) {
        console.log("there is no file");
      }
    }
  )
  .demandCommand(1)
  .parse();
