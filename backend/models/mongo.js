import mongoose from "mongoose";
const { set, Schema, model, connect, connection } = mongoose;

const password = process.argv[2];
const url = `mongodb+srv://bekalomsadze1:${password}@cluster0.vdm2jaj.mongodb.net/?retryWrites=true&w=majority`;

set("strict", true);
connect(url)
  .then((i) => console.log("connection successful"))
  .catch((err) => console.log("connection failed"));

const newSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  date: Date,
  like: Boolean,
});

newSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Book = model("Book", newSchema);

export default Book;
