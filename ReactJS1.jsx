import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenreAdmin = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('/api/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Gagal mengambil data genre:', error);
    }
  };

  const handleAddGenre = async () => {
    if (!newGenre.trim()) return;

    try {
      await axios.post('/api/genres', { name: newGenre });
      setNewGenre('');
      fetchGenres(); // Refresh data
    } catch (error) {
      console.error('Gagal menambahkan genre:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Daftar Genre</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nama Genre</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.id}>
              <td style={styles.td}>{genre.id}</td>
              <td style={styles.td}>{genre.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.form}>
        <h3>Tambah Genre Baru</h3>
        <input
          type="text"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          placeholder="Nama Genre"
          style={styles.input}
        />
        <button onClick={handleAddGenre} style={styles.button}>Tambah</button>
      </div>
    </div>
  );
};

// Inline CSS style object (bisa dipindah ke file .css jika mau)
const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1.5rem',
    background: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
  },
  th: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.75rem',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  td: {
    padding: '0.75rem',
    border: '1px solid #ddd',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.6rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default GenreAdmin;
