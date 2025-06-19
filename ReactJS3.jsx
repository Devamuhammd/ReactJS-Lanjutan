import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 420px;
  margin: 3rem auto;
  padding: 2.5rem 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.8rem;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1.3rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #444;
`;

const Input = styled.input`
  padding: 0.65rem 0.75rem;
  border: 1.5px solid ${props => (props.error ? '#dc3545' : '#ccc')};
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMsg = styled.p`
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.35rem;
`;

const RegisterForm = () => {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullname.trim()) newErrors.fullname = 'Nama lengkap wajib diisi';
    if (!form.email.includes('@')) newErrors.email = 'Format email tidak valid';
    if (!form.username.trim()) newErrors.username = 'Username wajib diisi';
    if (form.password.length < 6) newErrors.password = 'Password minimal 6 karakter';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert('Registrasi berhasil!');
      console.log('Data pengguna:', form);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Container>
      <Title>Registrasi Pengguna</Title>
      <form onSubmit={handleSubmit} noValidate>
        {['fullname', 'email', 'username', 'password'].map((field) => (
          <FormGroup key={field}>
            <Label htmlFor={field}>
              {field === 'fullname' ? 'Nama Lengkap' : field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              name={field}
              id={field}
              value={form[field]}
              onChange={handleChange}
              error={errors[field]}
            />
            {errors[field] && <ErrorMsg>{errors[field]}</ErrorMsg>}
          </FormGroup>
        ))}
        <Button type="submit">Daftar</Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
