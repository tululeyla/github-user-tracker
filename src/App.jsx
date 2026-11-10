import { useState, useEffect } from "react";
import SearchHeader from "./SearchHeader";

function App() {
  const [username, setUsername] = useState("octocat");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (newUsername) => {
    setUsername(newUsername);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Couldn't load the user (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setUser(null);
        setLoading(false);
      });
  }, [username]);

  return (
    <div>
      <h1 className="search-item">My GitHub Dashboard</h1>
      <SearchHeader onSearch={handleSearch} />
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && !loading && (
        <div>
          <h2>{user.name || user.login}</h2>
          <p>{user.bio || "No bio available"}</p>
          <img src= {user.avatar_url} alt="User Avatar" width="100" />
        </div>
      )}
    </div>
  );
}

export default App;