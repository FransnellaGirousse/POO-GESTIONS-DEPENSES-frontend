import React, { useState } from 'react';
import './LoginForm.css'; 

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Numéro de téléphone ou e-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
        <div className="login-footer">
          <a href="/">Mot de passe oublié ?</a>
          <p>Pas encore de compte ? <a href="/">Inscrivez-vous</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
