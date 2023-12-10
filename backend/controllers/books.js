import express from "express";
import Book from "../models/mongo.js";
import handleErrorResponse from "../utils/middleware.js";
const router = express.Router();
const app = express();

router.get("/", (request, response) => {
  Book.find({})
    .then((item) => {
      response.send(item);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send("Internal Server Error");
    });
});

router.get("/:id", (request, response) => {
  Book.findById(request.params.id)
    .then((item) => {
      response.send(item);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send("Internal Server Error");
    });
});

router.post("/", async (request, response, next) => {
  if (request.body.content) {
    const book = new Book({
      title: request.body.content,
      date: new Date().toISOString(),
      like: false,
    });

    try {
      await book.save();
      console.log("book saved");
      response.status(201).send(book);
    } catch (error) {
      console.log(error);
      response.status(500).send("internal Server Error");
      next(error);
    }
  } else {
    response
      .status(400)
      .send("Bad Request: Content is required in the request body");
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      request.params.id,
      { like: request.body.like },
      {
        new: true,
      }
    );
    response.send(updated);
  } catch (error) {
    response.status(500).send(error);
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const deleted = await Book.findByIdAndDelete(request.params.id);
    if (deleted) {
      console.log("Book deleted");
      response.status(200).send("Book deleted successfully");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.use(handleErrorResponse);

export default router;
