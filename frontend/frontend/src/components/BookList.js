import React from "react";

const BookList = ({ books, onEdit, onDelete }) => {
  return (
    <div className="book-list">
      <h2>📚 Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.available ? "✅" : "❌"}</td>
              <td>
                <button onClick={() => onEdit(book)}>Edit</button>
                <button onClick={() => onDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;