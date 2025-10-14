import React, { useState, useEffect } from "react";

const BookForm = ({ onSubmit, selectedBook }) => {
  const [book, setBook] = useState({ title: "", author: "", category: "" });

  useEffect(() => {
    if (selectedBook) setBook(selectedBook);
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book);
    setBook({ title: "", author: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        name="title"
        value={book.title}
        placeholder="Book Title"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        value={book.author}
        placeholder="Author"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        value={book.category}
        placeholder="Category"
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;