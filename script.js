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

//
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



function changeReadStatus(event) {
  if (event.target.textContent === "Not Read") {
    bookList.rows[event.target.dataset.rowNumber].cells[3].textContent =
      "Not Read";
    event.target.textContent = "Read";
  } else {
    bookList.rows[event.target.dataset.rowNumber].cells[3].textContent = "Read";
    event.target.textContent = "Not Read";
  }
}

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
      } else {
        readToggleButton.textContent = "Read";
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


function addBookToLibrary(book) {
  event.preventDefault();
  myLibrary.push(book);
  updateLibrary();
}

// 
function getNewBookInfo() {
  currentForm = document.createElement("form");
  const titleInput = document.createElement("input");
  titleInput.name = "title";
  const authorInput = document.createElement("input");
  const pageCountInput = document.createElement("input");
  const readStatusInput = document.createElement("input");
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.appendChild(document.createTextNode("Add Book"));
  currentForm.appendChild(titleInput);
  currentForm.appendChild(authorInput);
  currentForm.appendChild(pageCountInput);
  currentForm.appendChild(readStatusInput);
  currentForm.appendChild(submitButton);
  newBookForm.appendChild(currentForm);
  currentForm.addEventListener("submit", () => {
    addBookToLibrary(
      new Book(
        titleInput.value,
        authorInput.value,
        pageCountInput.value,
        readStatusInput.value
      )
    );
    titleInput.value = "";
    authorInput.value = "";
    pageCountInput.value = "";
    readStatusInput.value = "";
  });
}

// only allow the new book button to be used once at a time so that it doesnt create more than one form
newBookButton.addEventListener("click", getNewBookInfo, { once: true });

