const table = document.getElementsByClassName("book-list")[0];
const newBookButton = document.getElementsByClassName("new-book-button")[0];
const newBookForm = document.getElementsByClassName("new-book-form")[0];

let myLibrary = [];

function Book(title, author, pageCount, readStatus) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.readStatus = readStatus;
}

function addBookToLibrary() {
  const book = prompt("Add a new book!");
  myLibrary.push(book);
}

function updateLibrary() {
  let rowCount = 0;
  myLibrary.forEach((book) => {
    const newRow = table.insertRow(rowCount);
    let cellCount = 0;
    Object.values(book).forEach((prop) => {
      const newCell = newRow.insertCell(cellCount);
      const newCellText = document.createTextNode(prop);
      newCell.appendChild(newCellText);
      cellCount += 1;
    });
    rowCount += 1;
  });
}

function getNewBookInfo() {
  const newForm = document.createElement('form');
  const titleInput = document.createElement('input');
  const authorInput = document.createElement('input');
  const pageCountInput = document.createElement('input');
  const readStatusInput = document.createElement('input');
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.appendChild(document.createTextNode('Add Book'))
  newForm.appendChild(titleInput);
  newForm.appendChild(authorInput);
  newForm.appendChild(pageCountInput);
  newForm.appendChild(readStatusInput);
  newForm.appendChild(submitButton);
  newBookForm.appendChild(newForm);
}

const book1 = new Book(
  "'The Haunting of the Mansion on the Hill'",
  "Taylor McKinley",
  256,
  "Read"
);

const book2 = new Book(
  "'The Creeping on the Alligator Swamp'",
  "Bob Hutchinson",
  512,
  "Read"
);

const book3 = new Book(
  "'The Killing of the Innocent Little Cat'",
  "Jesse Odenhill",
  97,
  "Not Read"
);

newBookButton.addEventListener('click', getNewBookInfo)

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
updateLibrary();
console.log(myLibrary);
