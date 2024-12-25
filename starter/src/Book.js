const Book = ({ book }) => {
  const { title, authors, imageLinks } = book;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url("${imageLinks.smallThumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select>
            <option value="none">Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authors.map((author) => (
        <div className="book-authors">{author}</div>
      ))}
    </div>
  );
};

export default Book;
