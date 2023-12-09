import express from "express";
const router = express.Router();
import Book from "../models/mongo.js";

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

router.post("/", (request, response) => {
  if (request.body.content) {
    const book = new Book({
      title: request.body.content,
      date: new Date().toISOString(),
      like: false,
    });

    book
      .save()
      .then(() => {
        console.log("book saved");
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send("internal Server Error");
      });
  } else {
    response
      .status(400)
      .send("Bad Request: Content is required in the request body");
  }
});

router.put("/:id", async (request, response) => {
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
  }
});

export default router;
