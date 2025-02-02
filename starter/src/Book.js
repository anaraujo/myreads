import { useEffect, useState } from "react";
import { update } from "./BooksAPI";

const Book = ({ book, setBookUpdated }) => {
  const [selectedShelf, setSelectedShelf] = useState(book.shelf);
  const { title, authors, imageLinks } = book;

  const updateBook = async (book, shelf) => {
    setSelectedShelf(shelf);
    await update(book, shelf);
    setBookUpdated(true);
  };

  useEffect(() => {
    setSelectedShelf(book.shelf);
  }, [book.shelf]);

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url("${imageLinks?.smallThumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={selectedShelf}
            onChange={async (e) => {
              await updateBook(book, e.target.value);
            }}
          >
            <option value="select">Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authors?.map((author, key) => (
        <div key={key} className="book-authors">
          {author}
        </div>
      ))}
    </div>
  );
};

export default Book;
