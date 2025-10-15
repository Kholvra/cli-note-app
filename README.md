# Note CLI

A simple command-line interface (CLI) for taking notes, built with Node.js and yargs.

## Installation

1. Clone this repository:
   ```bash
   git clone <your-repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd note-cli
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

This CLI allows you to create, read, find, and remove notes directly from your terminal.

### Create a New Note

Use the `new` command to create a new note.

```bash
note new "My new note"
```

You can also add tags to your note using the `-t` or `--tags` option.

```bash
note new "Another note" --tags "work,important"
```

### List All Notes

Use the `all` command to display all your notes.

```bash
note all
```

To show the unique ID of each note, use the `-i` or `--showId` flag.

```bash
note all --showId
```

### Find Notes

Use the `find` command to search for notes containing a specific keyword.

```bash
note find "keyword"
```

### Remove a Note

Use the `remove` command followed by the note's ID to delete a note.

```bash
note remove <note-id>
```

## License

This project is licensed under the ISC License.
