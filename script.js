const newBookButton = document.getElementsByClassName("new-book-button")[0];
const newBookForm = document.getElementsByClassName("new-book-form")[0];
const bookList = document.getElementsByClassName("book-list")[0];
const table = document.getElementsByClassName("library-contents")[0];
const myLibrary = [];
const existingBooks = [];
let currentForm;
let rowCount = 0;

function Book(title, author, pageCount, readStatus) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.readStatus = readStatus;
}

// delete the targeted row by using the stored index. Adjust the rowCount variable for future row inserts.
// if the row wasn't the last one in the table, adjust all proceeding rows' attributes to have accurate rowNumber references.
function removeBook(event) {
  const deletedButtonRow = event.target.dataset.rowNumber;
  bookList.deleteRow(deletedButtonRow);
  rowCount -= 1;
  if (event.target.dataset.rowNumber === bookList.rows.length) {
    return;
  }
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((removeButton) => {
    if (removeButton.dataset.rowNumber > deletedButtonRow) {
      removeButton.dataset.rowNumber -= 1;
    }
  });
  const toggleReadButtons = document.querySelectorAll(".toggle-read-button");
  toggleReadButtons.forEach((readButton) => {
    if (readButton.dataset.rowNumber > deletedButtonRow) {
      readButton.dataset.rowNumber -= 1;
    }
  });
}

// Adjust text content of the book's read status to match the final state of the book after toggling read.
// Adjust the data attributes of the read toggle buttons to reflect the current read status of the book.
// This is done to create responsive color changes for the read toggle buttons as the data attributes are referenced in the css file.
function changeReadStatus(event) {
  if (event.target.textContent === "Not Read") {
    bookList.rows[event.target.dataset.rowNumber].cells[3].textContent =
      "Not Read";
    event.target.textContent = "Read";
    event.target.dataset.currentStatus = "read";
  } else {
    bookList.rows[event.target.dataset.rowNumber].cells[3].textContent = "Read";
    event.target.textContent = "Not Read";
    event.target.dataset.currentStatus = "notread";
  }
}

// If the book in the library is not already displayed in the table, insert a row and fill the cells with the book object properties.
// Create remove buttons and toggle buttons for the book's display in the table
// After this is all done ensure to increment rowCount variable for the next book that will be added to the table.
// Store the book's title to keep track that it is being displayed in the table.
function updateLibrary() {
  myLibrary.forEach((book) => {
    if (!existingBooks.includes(book.title)) {
      const newRow = bookList.insertRow(rowCount);
      let cellCount = 0;
      Object.values(book).forEach((prop) => {
        const newCell = newRow.insertCell(cellCount);
        const newCellText = document.createTextNode(prop);
        if (prop === "Read" || prop === "Not Read") {
          newCell.classList.add("read-status");
          newCell.dataset.rowNumber = rowCount;
        }
        newCell.appendChild(newCellText);
        cellCount += 1;
      });
      const removeButtonCell = newRow.insertCell(cellCount);
      const removeBookButton = document.createElement("button");
      removeBookButton.textContent = "Remove";
      removeBookButton.addEventListener("click", removeBook);
      removeBookButton.dataset.rowNumber = rowCount;
      removeBookButton.classList.add("remove-button");
      removeButtonCell.appendChild(removeBookButton);
      cellCount += 1;
      const readToggleCell = newRow.insertCell(cellCount);
      const readToggleButton = document.createElement("button");
      if (bookList.rows[rowCount].cells[3].textContent === "Read") {
        readToggleButton.textContent = "Not Read";
        readToggleButton.dataset.currentStatus = "notread";
      } else {
        readToggleButton.textContent = "Read";
        readToggleButton.dataset.currentStatus = "read";
      }
      readToggleButton.addEventListener("click", changeReadStatus);
      readToggleButton.dataset.rowNumber = rowCount;
      readToggleButton.classList.add("toggle-read-button");
      readToggleCell.appendChild(readToggleButton);
      rowCount += 1;
      existingBooks.push(book.title);
    }
  });
}

// prevent default behavior for the submit button as the data is used to create a new Book object instead
// The form inputs are cleaned up by the function that called this one.
function addBookToLibrary(book) {
  event.preventDefault();
  myLibrary.push(book);
  updateLibrary();
}

// To avoid having the new book button create more than one set of inputs, check to see if the form has more than one child when the event is triggered.
// If new Book Button hasn't created a set of inputs, create them.
// When the form is submitted, pass a Book object created from the form inputs' values to addBookToLibrary(), and remove the form object from its parent to reset the page.
function getNewBookInfo() {
  if (newBookForm.childNodes.length > 1) {
    return;
  }
  currentForm = document.createElement("form");
  const titleComponent = document.createElement("div");
  const titleLabel = document.createElement("label");
  titleLabel.htmlFor = "title";
  titleLabel.textContent = "Title: ";
  const titleInput = document.createElement("input");
  titleInput.id = "title";
  titleInput.required = true;
  const authorComponent = document.createElement("div");
  const authorInput = document.createElement("input");
  authorInput.id = "author";
  authorInput.required = true;
  const authorLabel = document.createElement("label");
  authorLabel.htmlfor = "author";
  authorLabel.textContent = "Author: ";
  const pageCountComponent = document.createElement("div");
  const pageCountInput = document.createElement("input");
  pageCountInput.type = "number";
  pageCountInput.id = "pages";
  pageCountInput.required = true;
  pageCountInput.min = "1";
  const pageCountLabel = document.createElement("label");
  pageCountLabel.htmlfor = "pages";
  pageCountLabel.textContent = "Page Count: ";
  const readOption = document.createElement("input");
  readOption.value = "Read";
  readOption.type = "radio";
  readOption.name = "readStatus";
  readOption.id = "read";
  const notReadOption = document.createElement("input");
  notReadOption.value = "Not Read";
  notReadOption.type = "radio";
  notReadOption.name = "readStatus";
  notReadOption.id = "notread";
  const readOptionLabel = document.createElement("label");
  readOptionLabel.htmlFor = "read";
  readOptionLabel.textContent = "Read";
  const notReadOptionLabel = document.createElement("label");
  notReadOptionLabel.htmlFor = "notread";
  notReadOptionLabel.textContent = "Not Read";
  const readStatusComponent = document.createElement("fieldset");
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.appendChild(document.createTextNode("Add Book"));
  titleComponent.appendChild(titleLabel);
  titleComponent.appendChild(titleInput);
  authorComponent.appendChild(authorLabel);
  authorComponent.appendChild(authorInput);
  pageCountComponent.appendChild(pageCountLabel);
  pageCountComponent.appendChild(pageCountInput);
  readStatusComponent.appendChild(readOption);
  readStatusComponent.appendChild(readOptionLabel);
  readStatusComponent.appendChild(notReadOption);
  readStatusComponent.appendChild(notReadOptionLabel);
  currentForm.appendChild(titleComponent);
  currentForm.appendChild(authorComponent);
  currentForm.appendChild(pageCountComponent);
  currentForm.appendChild(readStatusComponent);
  currentForm.appendChild(submitButton);
  newBookForm.appendChild(currentForm);
  currentForm.addEventListener("submit", () => {
    let chosenRadioButton;
    if (readOption.checked) {
      chosenRadioButton = readOption.value;
    } else {
      chosenRadioButton = notReadOption.value;
    }
    addBookToLibrary(
      new Book(
        titleInput.value,
        authorInput.value,
        pageCountInput.value,
        chosenRadioButton
      )
    );
    newBookForm.removeChild(currentForm);
  });
}

newBookButton.addEventListener("click", getNewBookInfo);
