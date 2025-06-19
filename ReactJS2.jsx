import React, { useEffect, useState } from 'react';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../services/authorService';

const AuthorAdmin = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await getAuthors();
      setAuthors(res.data);
    } catch (err) {
      console.error('Gagal memuat data author:', err);
    }
  };

  const handleAdd = async () => {
    if (!newAuthor.trim()) return;
    try {
      await createAuthor({ name: newAuthor });
      setNewAuthor('');
      fetchAuthors();
    } catch (err) {
      console.error('Gagal menambahkan author:', err);
    }
  };

  const handleEdit = (author) => {
    setEditId(author.id);
    setEditName(author.name);
  };

  const handleUpdate = async () => {
    try {
      await updateAuthor(editId, { name: editName });
      setEditId(null);
      setEditName('');
      fetchAuthors();
    } catch (err) {
      console.error('Gagal mengupdate author:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      fetchAuthors();
    } catch (err) {
      console.error('Gagal menghapus author:', err);
    }
  };

  return (
    <div>
      <h2>Author Admin</h2>
      <input
        type="text"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
        placeholder="Nama Author Baru"
      />
      <button onClick={handleAdd}>Tambah</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>
                {editId === author.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  author.name
                )}
              </td>
              <td>
                {editId === author.id ? (
                  <button onClick={handleUpdate}>Simpan</button>
                ) : (
                  <button onClick={() => handleEdit(author)}>Edit</button>
                )}
                <button onClick={() => handleDelete(author.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorAdmin;
