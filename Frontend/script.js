const API_URL = "http://localhost:3000/books";
loadBooks();

function getImageUrl(book) {
    if (!book.image) return '';
    return book.image.includes('/')
        ? `http://localhost:3000/${book.image}`
        : `http://localhost:3000/images/${book.image}`;
}

function loadBooks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('bookList');
            bookList.innerHTML = '';

            data.forEach(book => {
                const imageUrl = getImageUrl(book);
                bookList.innerHTML += `
                    <div class="book-card">
                        <img src="${imageUrl}" alt="${book.title}">
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author_name}</p>
                        <p>Category: ${book.category}</p>
                        <p>$${book.price}</p>
                        <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
                    </div>
                `;
            });
        });
}

function addBook() {
    const title = document.getElementById('title').value.trim();
    const authorName = document.getElementById('author_name').value.trim();
    const price = document.getElementById('price').value.trim();
    const category = document.getElementById('category').value.trim();
    const imageInput = document.getElementById('image');

    if (!title || !authorName || !price || !category || !imageInput.files.length) {
        alert('Please enter all fields and choose an image.');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('name', authorName);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', imageInput.files[0]);

    fetch(API_URL, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert(result.error);
                return;
            }
            document.getElementById('title').value = '';
            document.getElementById('author_name').value = '';
            document.getElementById('price').value = '';
            document.getElementById('category').value = '';
            imageInput.value = '';
            loadBooks();
        })
        .catch(() => alert('Failed to add book.'));
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
    const keyword = document.getElementById('search').value.trim();
    if (!keyword) {
        document.getElementById('searchError').textContent = 'Please enter a search keyword.';
        loadBooks();
        return;
    }
    document.getElementById('searchError').textContent = '';
    fetch(`${API_URL}/search/${encodeURIComponent(keyword)}`)
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('bookList');
            bookList.innerHTML = '';
 data.forEach(book => {
                const imageUrl = getImageUrl(book);
                bookList.innerHTML += `
                    <div class="book-card">
                        <img src="${imageUrl}" alt="${book.title}">
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author_name}</p>
                        <p>Category: ${book.category}</p>
                        <p>$${book.price}</p>
                    </div>
                `;
 });
 });
}