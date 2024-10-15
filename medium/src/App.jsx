import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Start from page 1

  // Function to fetch data based on the current page
  const fetchData = async (currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${currentPage}&order=Desc`
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the page number changes
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Handlers for Next and Previous page buttons
  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrevious = () => setPage((prev) => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-4">
      <h1 className="text-2xl mb-4">Cat Gallery</h1>

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

      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePrevious}
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
