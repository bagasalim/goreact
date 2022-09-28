import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  console.log(data?.data);
  const getData = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL);
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center  mb-4 text-yellow-200 text-3xl">Connect Go with React using Rest API</h1>
      </div>
      {error && <div>Failed to load {error.toString()}</div>}
      {!data ? <div className="text-center text-amber-400">Loading...</div> : (data?.data ?? []).length === 0 && <p className="text-center text-amber-400">Data Kosong</p>}
      <Input onSuccess={getData} />
      {data?.data && data?.data?.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  );
}

function Input({ onSuccess }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currenTarget);
    const body = {
      text: formData.get("data"),
    };
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/send`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setData(data.message);
      onSuccess();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      {error && <p>error: {error.toString()}</p>}
      {data && <p>success: {data}</p>}
      <form className="text-center text-amber-400" onSubmit={handleSubmit}>
        <input className="rounded-md" name="data" type="text" />
        <button className="ml-1">Submit</button>
      </form>
    </div>
  );
}
