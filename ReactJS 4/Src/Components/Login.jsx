import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    loginAs(role);
    navigate('/');
  };

  return (
    <div>
      <h2>Pilih Role Login</h2>
      <button onClick={() => handleLogin('user')}>Login sebagai User</button>
      <button onClick={() => handleLogin('admin')}>Login sebagai Admin</button>
    </div>
  );
};

export default Login;
