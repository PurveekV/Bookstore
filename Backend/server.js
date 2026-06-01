const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

/* GET ALL BOOKS */
app.get('/books', async (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

/* SEARCH BOOKS */
app.get('/books/search/:keyword', (req, res) => {
    const keyword = `%${req.params.keyword}%`;

    db.query('SELECT * FROM books WHERE title LIKE ? OR author LIKE ?', [keyword, keyword], (err, results) => {
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
        author,
        price,
        category,
        iamge
    } = req.body;

    db.query('INSERT INTO books (title, author, price, category, iamge) VALUES (?, ?, ?, ?, ?)', [title, author, price, category, iamge], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ message: 'Book added successfully', bookId: results.insertId });
    });
}); 

/* DELETE A BOOK */
app.delete('/books/:id', (req, res) => {

    db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ message: 'Book deleted successfully' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

