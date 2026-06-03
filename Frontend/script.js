const API_URL =
 "http://localhost:3000/books";
loadBooks();

function loadBooks() {
 fetch(API_URL)
 .then(response => response.json())
 .then(data => {

 const bookList =
 document.getElementById("bookList");
 bookList.innerHTML = "";
 
 data.forEach(book => {
 bookList.innerHTML += `
 <div class="book-card">
 <img src="http://localhost:3000/images/${book.image}" alt="${book.title}">
 <h3>${book.title}</h3>
 <p>
 Author:
 ${book.author_name}
 </p>
 <p>
 Category:
 ${book.category}
 </p>
 <p>
 $${book.price}
 </p>
 <button
 class="delete-btn"
 onclick="deleteBook(${book.id})">
 Delete
 </button>
 </div>
 `;
 });
 });
 }

function addBook() {
 const book = {
  title:
 document.getElementById("title").value,
 author:
 document.getElementById("author_name").value,
 price:
 document.getElementById("price").value,
 category:
 document.getElementById("category").value,
 image:
 document.getElementById("image").value
 };
 fetch(API_URL, {
 method: "POST",
 headers: {
 "Content-Type":
 "application/json"
 },
 body: JSON.stringify(book)
 })
 .then(response => response.json())
 .then(() => {
 loadBooks();
 });
}

function deleteBook(id) {
 fetch(
 `${API_URL}/${id}`,
 {
 method: "DELETE"
 }
 )
 .then(response => response.json())
 .then(() => {
 loadBooks();
 });
}

function searchBooks() {
 const keyword =
 document.getElementById("search").value;
 /* Prompt user to enter a search keyword if the input is empty */
 if (!keyword) {
     document.getElementById("searchError").textContent = "Please enter a search keyword.";
    loadBooks();
    return;
    }
 fetch(`${API_URL}/search/${keyword}`)
 .then(response => response.json())
 .then(data => {
 const bookList =
 document.getElementById("bookList");
 bookList.innerHTML = "";
 data.forEach(book => {
 bookList.innerHTML += `
 <div class="book-card">
 <img src="http://localhost:3000/images/${book.image}" alt="${book.title}">
 <h3>${book.title}</h3>
 <p>${book.author_name}</p>
 <p>$${book.price}</p>
 </div>
 `;
 });
 });
}