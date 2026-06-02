const API_URL =
 "hƩp://localhost:3000/books";
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
 <img src="${book.image}">
 <h3>${book.Ɵtle}</h3>
 <p>
 Author:
 ${book.author}
 </p>
 <p>
 Category:
 ${book.category}
 </p>
 <p>
 $${book.price}
 </p>
 <buƩon
 class="delete-btn"
 onclick="deleteBook(${book.id})">
 Delete
 </buƩon>
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
 document.getElementById("author").value,
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
 "applicaƟon/json"
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
 fetch(
 `hƩp://localhost:3000/books/search/${keyword}`
 )
 .then(response => response.json())
 .then(data => {
 const bookList =
 document.getElementById("bookList");
 bookList.innerHTML = "";
 data.forEach(book => {
 bookList.innerHTML += `
 <div class="book-card">
 <img src="${book.image}">
 <h3>${book.title}</h3>
 <p>${book.author}</p>
 <p>$${book.price}</p>
 </div>
 `;
 });
 });
}