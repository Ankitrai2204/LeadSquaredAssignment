import { useState } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc"
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-4">
      <button
        onClick={fetchData}
        className="bg-blue-500 px-4 py-2 mb-4 rounded hover:bg-blue-600"
      >
        Fetch Cats
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && data.length === 0 && <p>No data found</p>}

      <div className="grid grid-cols-2 gap-4">
        {data.map((cat) => (
          <div
            key={cat.id}
            className="bg-gray-700 p-4 rounded shadow-lg flex flex-col items-center"
          >
            <img src={cat.url} alt="Cat" className="w-40 h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
