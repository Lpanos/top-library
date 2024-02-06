const myLibrary = [];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return this.title + ', by ' + this.author + ', ' + this.pages + ' pages, ' + this.read;
    };
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book(title, author, pages, read)
        myLibrary.push(newBook);
};

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'Read');
addBookToLibrary('The Hobbit 2', 'J.R.R. Tolkien', '295', 'Unread');

const dialog = document.querySelector("dialog");
const addBookBtn = document.getElementById("addBookBtn");
const submitBtn = document.getElementById("submitBtn");
const content = document.querySelector(".content");

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

submitBtn.addEventListener("click", (event) => {
    const form = document.getElementById("add-form");

    addBookToLibrary(form.booktitle.value, form.bookauthor.value, form.bookpages.value, form.bookread.checked);

    updateLibrary(myLibrary[myLibrary.length - 1], (myLibrary.length - 1));

    dialog.close();

    form.reset();

    event.preventDefault();
    
  });

content.addEventListener('click', (event) => {
    const isReadBtn = event.target.classList.contains("readBtn");
    const isDeleteBtn = event.target.classList.contains("deleteBtn");

    if (isReadBtn) {
        const readBtn = event.target;

        if(readBtn.dataset.read == 'true'){
            readBtn.textContent = "Unread";
            readBtn.dataset.read = 'false';
        } else {
            readBtn.textContent = "Read";
            readBtn.dataset.read = 'true';
        };
    } else if (isDeleteBtn){
       const parentDiv = document.querySelector(`div[data-arraypos='${event.target.dataset.arraypos}']`);
            parentDiv.remove();
                myLibrary.splice(event.target.dataset.arraypos, 1);
    } else {
        return;
    }

  })

let updateLibrary = function(librarySelection, arrayPos){

    const newDiv = document.createElement("div");

    const currentBookNumber = document.createElement("p");
    const currentBookTitle = document.createElement("p");
    const currentBookAuthor = document.createElement("p");
    const currentBookPages = document.createElement("p");
    const currentBookRead = document.createElement("button");
    const currentBookDelete = document.createElement("button");

    console.log(librarySelection.read);

    currentBookNumber.textContent = 'Book #: ' + (arrayPos + 1);
    currentBookTitle.textContent = 'Title: ' + librarySelection.title;
    currentBookAuthor.textContent = 'Author: ' + librarySelection.author;
    currentBookPages.textContent = 'Page Count: ' + librarySelection.pages;
    currentBookDelete.textContent = 'Remove Book From Library';

    if(librarySelection.read == 'true' || librarySelection.read == "Read" || librarySelection.read == true){
        currentBookRead.dataset.read = 'true';
        currentBookRead.textContent = "Read"
    } else {
        currentBookRead.dataset.read = 'false';
        currentBookRead.textContent = "Unread"
    };

    currentBookRead.classList.add("readBtn")
    currentBookDelete.classList.add("deleteBtn")
    currentBookDelete.dataset.arraypos = arrayPos;


    newDiv.appendChild(currentBookNumber);
    newDiv.appendChild(currentBookTitle);
    newDiv.appendChild(currentBookAuthor);
    newDiv.appendChild(currentBookPages);
    newDiv.appendChild(currentBookRead);
    newDiv.appendChild(currentBookDelete);

    newDiv.classList.add("book-container");

    newDiv.dataset.arraypos = arrayPos;

    content.appendChild(newDiv);

}

for (let i= 0; i < myLibrary.length; i++){

updateLibrary(myLibrary[i], i);

}