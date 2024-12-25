import { useEffect, useState } from "react";
import Bookshelf from "./Bookshelf";

const HomePage = ({ books, setShowSearchpage, showSearchPage }) => {
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
  );
};

export default HomePage;
