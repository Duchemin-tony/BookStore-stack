import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Route for Save a new book
app.post("/books", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ error: "Data not formatted properly" });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send({ book });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

// Route for Get all books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

// Route for Get one book from the database by id
app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

// Route for Update a book
app.put("/books/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ error: "Send all required fields: title, author, publishYear" });
        }
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(400).json({ error: "No book with given id" });
        }

        return res.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

// Route for Delete a book
app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(400).json({ error: "No book with given id" });
        }

        return res.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
