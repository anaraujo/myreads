import { useState } from "react";
import { search } from "./BooksAPI";
import Book from "./Book";

const DEFAULT_SHELF = "none";

const SearchPage = ({
  books,
  showSearchPage,
  setShowSearchpage,
  setBookUpdated,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);

  const searchBook = async (term) => {
    setSearchTerm(term);
    try {
      const res = await search(term);
      const data = res.map((searchedBook) => {
        const bookInLibrary = books.find((book) => book.id === searchedBook.id);
        let shelf = DEFAULT_SHELF;
        if (bookInLibrary) shelf = bookInLibrary.shelf;
        return { ...searchedBook, shelf };
      });
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
            value={searchTerm}
            onChange={async (e) => await searchBook(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {result.map((book, key) => (
            <li key={key}>
              <Book book={book} setBookUpdated={setBookUpdated} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
