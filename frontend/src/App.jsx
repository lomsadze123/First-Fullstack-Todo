import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value) {
      try {
        const response = await axios.post("http://localhost:3001/api/books", {
          content: value,
        });

        response.data.id && setData((prevData) => [...prevData, response.data]);
        setValue("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLikes = async (index, id) => {
    const liked = data.map((book, i) =>
      i === index ? { ...book, like: !book.like } : book
    );
    setData(liked);

    try {
      const updated = data.find((book) => book.id === id);
      await axios.put(`http://localhost:3001/api/books/${id}`, {
        like: !updated.like,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (index, id) => {
    const filter = data.filter((_, itemIndex) => itemIndex !== index);
    setData(filter);

    try {
      await axios.delete(`http://localhost:3001/api/books/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/books");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto my-8 max-w-md text-white">
      <h1 className="text-3xl font-bold mb-4">Books App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          onChange={(e) => setValue(e.target.value)}
          type="text"
          value={value}
          placeholder="Type here..."
          className="border p-2 w-full text-black outline-0 rounded"
        />
      </form>
      <ul>
        {data &&
          data.map((book, index) => (
            <div key={book.id} className="mb-4 flex justify-between">
              <li className="text-lg font-medium">{book.title}</li>
              <div>
                <button
                  onClick={() => handleLikes(index, book.id)}
                  className="bg-blue-500 py-1 px-2 rounded"
                >
                  <b>Like</b> {book.like.toString()}
                </button>
                <button
                  onClick={() => handleRemove(index, book.id)}
                  className="bg-blue-500 py-1 px-2 rounded ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default App;
