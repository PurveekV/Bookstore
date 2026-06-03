const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const db = require('./db');

const app = express();
const uploadDir = path.join(__dirname, '../images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage });

app.use('/images', express.static(uploadDir));
app.use(cors());
app.use(express.json());

/* GET ALL BOOKS */
app.get('/books', async (req, res) => {
    db.query(
        `SELECT 
            b.books_id AS id,
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
                image: book.image
            }));
            res.json(books);
        });
    });

/* SEARCH BOOKS */
app.get('/books/search/:keyword', (req, res) => {
    const keyword = `%${req.params.keyword}%`;
    db.query(
        `SELECT 
            b.books_id AS id,
            b.title, 
            a.name as author_name,
            b.price,
            b.category,
            b.image
         from books b
         join authors a on a.author_id = b.author_id
         where b.title LIKE ? OR a.name LIKE ?`, 
            [keyword, keyword], 
            (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

/* ADD A NEW BOOK */
app.post('/books', upload.single('image'), (req, res) => {
    const { title, name, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !name || !price || !category || !image) {
        return res.status(400).json({ error: 'Title, author, price, category, and image are required.' });
    }

    const insertBook = (author_id) => {
        db.query(
            'INSERT INTO books (title, author_id, price, category, image) VALUES (?, ?, ?, ?, ?)',
            [title, author_id, price, category, image],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database query failed' });
                }
                res.json({ message: 'Book added successfully', bookId: results.insertId });
            }
        );
    };

    db.query('SELECT author_id FROM authors WHERE name = ?', [name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        if (results.length > 0) {
            insertBook(results[0].author_id);
        } else {
            db.query('INSERT INTO authors (name) VALUES (?)', [name], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database query failed' });
                }
                insertBook(result.insertId);
            });
        }
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

