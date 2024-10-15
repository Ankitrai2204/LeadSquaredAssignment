import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const loader = useRef(null); // Reference for the loader

  const fetchData = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`
      );
      setData((prevData) => [...prevData, ...response.data]);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-4">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && data.length === 0 && <p>No data found</p>}

      <div className="flex flex-col gap-4 w-full items-center">
        {data.map((cat) => (
          <div
            key={cat.id}
            className="bg-gray-700 p-4 rounded shadow-lg w-80 flex flex-col items-center"
          >
            <img src={cat.url} alt="Cat" className="w-full h-60 object-cover" />
          </div>
        ))}
      </div>

      <div ref={loader} className="h-10"></div>
    </div>
  );
}
