const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Task 10: Get all books using a Promise
public_users.get("/books", async (req, res) => {
    try {
        const booksData = await new Promise((resolve, reject) => {
            resolve(books); // resolve the books object
        });
        res.json(booksData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Task 11: Get book by ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const bookData = await new Promise((resolve, reject) => {
            if (books[isbn]) resolve({ [isbn]: books[isbn] });
            else reject(new Error("Book not found"));
        });
        res.json(bookData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Task 12: Get books by author
public_users.get("/author/:author", async (req, res) => {
    const author = req.params.author.toLowerCase();
    try {
        const filteredBooks = await new Promise((resolve, reject) => {
            const result = {};
            Object.keys(books).forEach(isbn => {
                if (books[isbn].author.toLowerCase() === author) {
                    result[isbn] = books[isbn];
                }
            });
            if (Object.keys(result).length > 0) resolve(result);
            else reject(new Error("No books found for this author"));
        });
        res.json(filteredBooks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Task 13: Get books by title
public_users.get("/title/:title", async (req, res) => {
    const title = req.params.title.toLowerCase();
    try {
        const filteredBooks = await new Promise((resolve, reject) => {
            const result = {};
            Object.keys(books).forEach(isbn => {
                if (books[isbn].title.toLowerCase() === title) {
                    result[isbn] = books[isbn];
                }
            });
            if (Object.keys(result).length > 0) resolve(result);
            else reject(new Error("No books found with this title"));
        });
        res.json(filteredBooks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
module.exports.general = public_users; 
