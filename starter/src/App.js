import "./App.css";
import { useEffect, useState } from "react";
import Bookshelf from "./Bookshelf";
import { getAll } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookshelves, setBookshelves] = useState({
    currentlyReading: {
      title: "Currently Reading",
      books: [],
    },
    wantToRead: {
      title: "Want to Read",
      books: [],
    },
    read: {
      title: "Read",
      books: [],
    },
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAll();
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    setBookshelves((prevBookshelves) => {
      const updatedBookshelves = Object.entries(prevBookshelves).reduce(
        (acc, [key, bookshelf]) => {
          acc[key] = {
            ...bookshelf,
            books: books.filter((book) => book.shelf === key),
          };
          return acc;
        },
        {}
      );

      return updatedBookshelves;
    });
  }, [books]);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Object.entries(bookshelves).map(([key, bookshelf]) => {
                const { title, books } = bookshelf;
                return <Bookshelf key={key} title={title} books={books} />;
              })}
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
