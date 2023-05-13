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
function removeBook(event) {
  const deletedButtonRow = event.target.dataset.rowNumber;
  bookList.deleteRow(deletedButtonRow);
  rowCount-=1;
  if(event.target.dataset.rowNumber === bookList.rows.length){
    return;
  }
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((removeButton) => {
    if(removeButton.dataset.rowNumber > deletedButtonRow){
      removeButton.dataset.rowNumber-=1;
    }
  })
  
  
}

function updateLibrary() {
  myLibrary.forEach((book) => {
    if(!(existingBooks.includes(book.title))){
      const newRow = bookList.insertRow(rowCount);
      let cellCount = 0;
      Object.values(book).forEach((prop) => {
        const newCell = newRow.insertCell(cellCount);
        const newCellText = document.createTextNode(prop);
        newCell.appendChild(newCellText);
        cellCount += 1;
      });
      const newCell = newRow.insertCell(cellCount);
      const newCellButton = document.createElement('button');
      newCellButton.textContent='Remove'
      newCellButton.addEventListener('click', removeBook);
      newCellButton.dataset.rowNumber = rowCount;
      newCellButton.classList.add("remove-button");
      newCell.appendChild(newCellButton);
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

function getNewBookInfo() {
  currentForm = document.createElement('form');
  const titleInput = document.createElement('input');
  titleInput.name = 'title';
  const authorInput = document.createElement('input');
  const pageCountInput = document.createElement('input');
  const readStatusInput = document.createElement('input');
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.appendChild(document.createTextNode('Add Book'))
  currentForm.appendChild(titleInput);
  currentForm.appendChild(authorInput);
  currentForm.appendChild(pageCountInput);
  currentForm.appendChild(readStatusInput);
  currentForm.appendChild(submitButton);
  newBookForm.appendChild(currentForm);
  currentForm.addEventListener('submit', () => {
    addBookToLibrary(new Book(titleInput.value, authorInput.value, pageCountInput.value, readStatusInput.value));
    titleInput.value="";
    authorInput.value="";
    pageCountInput.value="";
    readStatusInput.value="";
  })
}

newBookButton.addEventListener('click', getNewBookInfo, {once: true});

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


myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
existingBooks.push(book1);
existingBooks.push(book2);
existingBooks.push(book3);
updateLibrary();


