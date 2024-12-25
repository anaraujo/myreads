import Book from "./Book";

const Bookshelf = ({ title, books, setBookUpdated }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, key) => (
            <li key={key}>
              <Book book={book} setBookUpdated={setBookUpdated} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
