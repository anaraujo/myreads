import "./App.css";
import { useEffect, useState } from "react";
import { getAll } from "./BooksAPI";
import SearchPage from "./SearchPage";
import HomePage from "./HomePage";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [bookUpdated, setBookUpdated] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAll();
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (bookUpdated) setBookUpdated(false);

    fetchBooks();
  }, [bookUpdated]);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          books={books}
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
          setBookUpdated={setBookUpdated}
        />
      ) : (
        <HomePage
          books={books}
          setShowSearchpage={setShowSearchpage}
          showSearchPage={showSearchPage}
          setBookUpdated={setBookUpdated}
        />
      )}
    </div>
  );
}

export default App;
