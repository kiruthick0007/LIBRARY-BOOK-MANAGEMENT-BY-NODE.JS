import React, { useEffect, useState  , useContext} from "react";
import { getBooks, addBook, updateBook, deleteBook } from "../services/bookService";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { AuthContext } from "../context/AuthContext";


const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
}
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response.data);
  };

  const handleAddOrUpdate = async (book) => {
    if (selectedBook) {
      await updateBook(selectedBook._id, book);
      setSelectedBook(null);
    } else {
      await addBook(book);
    }
    fetchBooks();
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };
  
const { logout, user } = useContext(AuthContext);

return (
  <div className="home-page">
    <div className="header">
      <h1>📘 Library Book Management</h1>
      <div>
        <span>Welcome, {user?.username}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
    <BookForm
      onSubmit={handleAddOrUpdate}
      selectedBook={selectedBook}
      onCancel={() => setSelectedBook(null)}
    />
    <BookList
      books={books}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  </div>
);


export default Home;



    