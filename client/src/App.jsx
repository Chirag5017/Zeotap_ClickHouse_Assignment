import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [database, setDatabase] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [tableName, setTableName] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file || !host || !port || !database || !user || !token || !tableName) {
      alert('❌ Please fill in all fields and upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('host', host);
    formData.append('port', port);
    formData.append('database', database);
    formData.append('user', user);
    formData.append('token', token);
    formData.append('tableName', tableName);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/ingest/flat-to-clickhouse',
        formData
      );
      alert(`✅ Uploaded ${res.data.count} records successfully!`);
    } catch (err) {
      alert('❌ Upload failed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🔐 ClickHouse CSV Uploader with JWT</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Host (e.g., http://localhost)" value={host} onChange={(e) => setHost(e.target.value)} className="input" />
          <input type="text" placeholder="Port (e.g., 8123)" value={port} onChange={(e) => setPort(e.target.value)} className="input" />
          <input type="text" placeholder="Database" value={database} onChange={(e) => setDatabase(e.target.value)} className="input" />
          <input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} className="input" />
          <input type="text" placeholder="JWT Token" value={token} onChange={(e) => setToken(e.target.value)} className="input col-span-2" />
          <input type="text" placeholder="Table Name" value={tableName} onChange={(e) => setTableName(e.target.value)} className="input col-span-2" />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="col-span-2" />
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Upload CSV
        </button>
      </div>
    </div>
  );
}

export default App;
