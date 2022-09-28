import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL);
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div>Failed to load {error.toString()}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>data: {data.message}</p>
    </div>
  );
}
