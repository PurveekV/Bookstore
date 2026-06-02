const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use('/images', express.static(path.join(__dirname, 'Database/images')));
app.use(cors());
app.use(express.json());

/* GET ALL BOOKS */
app.get('/books', async (req, res) => {
    db.query(
        `SELECT 
            b.title,
            b.price,
            b.category,
            b.image,
            a.name AS author_name
         FROM books b
         JOIN authors a
            ON b.author_id = a.author_id`,
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed' });
            }
            const books = results.map(book => ({
                ...book,
                image: `http://localhost:3000/images/${book.image}`
            }));

            res.json(books);
        });
    });

/* SEARCH BOOKS */
app.get('/books/search/:keyword', (req, res) => {
    const keyword = `%${req.params.keyword}%`;

    db.query('SELECT * FROM books WHERE title LIKE ? OR authors LIKE ?', [keyword, keyword], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

/* ADD A NEW BOOK */
app.post('/books', (req, res) => {
    const {
        title,
        author_name,
        price,
        category,
        image
    } = req.body;

    db.query('INSERT INTO books (title, author_id, price, category, image) VALUES (?, ?, ?, ?, ?)', [title, author_name, price, category, image], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ message: 'Book added successfully', bookId: results.insertId });
    });
}); 

/* DELETE A BOOK */
app.delete('/books/:id', (req, res) => {

    db.query('DELETE FROM books WHERE books_id = ?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ message: 'Book deleted successfully' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

