import express from "express";
import cors from "cors";
import router from "./controllers/books.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/books", router);

app.listen(3001, () => console.log("listening on 3001"));
