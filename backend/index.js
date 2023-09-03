import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/booksRoute.js";

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/books", bookRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
