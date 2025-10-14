import axios from "axios";

const API_URL = "http://localhost:5000/api/books/";

const getToken = () => localStorage.getItem("token");

export const getBooks = () =>
  axios.get(API_URL, { headers: { Authorization: Bearer ${getToken()} } });

export const addBook = (book) =>
  axios.post(API_URL, book, { headers: { Authorization: Bearer ${getToken()} } });

export const updateBook = (id, book) =>
  axios.put(API_URL + id, book, { headers: { Authorization: Bearer ${getToken()} } });

export const deleteBook = (id) =>
  axios.delete(API_URL + id, { headers: { Authorization: Bearer ${getToken()} } });