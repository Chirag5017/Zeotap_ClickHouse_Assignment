import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [tableName, setTableName] = useState("");

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tableName", tableName);

      const res = await axios.post("http://localhost:5000/api/ingest/flat-to-clickhouse", formData);
      alert(`Uploaded ${res.data.count} records successfully!`);
    } catch (err) {
      alert(" Upload failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">📤 CSV to ClickHouse</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Table Name</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., my_table"
            onChange={(e) => setTableName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload CSV</label>
          <input
            type="file"
            className="w-full"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default App;
