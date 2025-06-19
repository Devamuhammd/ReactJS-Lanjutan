import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenreAdmin = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await axios.get('/api/genres');
      setGenres(res.data);
    } catch (err) {
      console.error('Gagal mengambil data genre', err);
    }
  };

  const handleAdd = async () => {
    if (!newGenre.trim()) return;
    await axios.post('/api/genres', { name: newGenre });
    setNewGenre('');
    fetchGenres();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/genres/${id}`);
    fetchGenres();
  };

  const handleEdit = (genre) => {
    setEditId(genre.id);
    setEditName(genre.name);
  };

  const handleUpdate = async () => {
    await axios.put(`/api/genres/${editId}`, { name: editName });
    setEditId(null);
    setEditName('');
    fetchGenres();
  };

  return (
    <div>
      <h2>Genre</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Genre</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.id}>
              <td>{genre.id}</td>
              <td>
                {editId === genre.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  genre.name
                )}
              </td>
              <td>
                {editId === genre.id ? (
                  <button onClick={handleUpdate}>Simpan</button>
                ) : (
                  <button onClick={() => handleEdit(genre)}>Edit</button>
                )}
                <button onClick={() => handleDelete(genre.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Tambah Genre Baru</h3>
      <input
        type="text"
        value={newGenre}
        onChange={(e) => setNewGenre(e.target.value)}
        placeholder="Nama Genre"
      />
      <button onClick={handleAdd}>Tambah</button>
    </div>
  );
};

export default GenreAdmin;
