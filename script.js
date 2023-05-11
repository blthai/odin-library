const table = document.getElementsByClassName("book-list")[0];

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
    let newRow = table.insertRow(rowCount);
    let cellCount = 0;
    Object.values(book).forEach((prop) => {
      let newCell = newRow.insertCell(cellCount);
      let newCellText = document.createTextNode(prop);
      newCell.appendChild(newCellText);
      cellCount += 1;
    });
    rowCount += 1;
  });
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

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
updateLibrary();
console.log(myLibrary);
