import React from 'react'
import '../CSS/login.css'
import {useState} from 'react'
import userAPI from '../data/User'
import axios from 'axios'

function Login(isLoggedIn, setIsLoggedIn, userName, setUserName, setUserRole) {

  const [isRegister, setIsRegister] = useState(false);
  
  
  const [formData, setFormData] = useState({
    Mail: '',
    password: '',
    login: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isRegister) {
      try{await axios.post(userAPI,{ Mail: formData.Mail,login:formData.login, password: formData.password,role:"user" })
      setIsRegister(!isRegister)}
            catch(error){console.log(error)}
      
    } else {
       
      try {     
        const response = await axios.get(userAPI);
        const users = response.data;  
        const loggedUser = users.find( 
          (user) => user.Mail === formData.Mail && user.password === formData.password );
  
        if (loggedUser) {
          console.log("success:", loggedUser);         
          localStorage.setItem('userLogin', loggedUser.login);
          localStorage.setItem('userRole', loggedUser.role);
          localStorage.setItem('isconnected', true);  
          alert("Bienvenue "+`${loggedUser.login}`);
          
          window.location.href = "/"; 
        } else {
          alert("Email ou mot de passe incorrect !");
        }
      } catch (error) {
        console.error(error);
        alert("Impossible de se connecter au serveur.");
      }
    } } ;

  return (
    <div className="auth-container">
      <div className="auth-card">
       
        <h2 className="auth-title">
          {isRegister ? "Créer un compte" : "Se connecter"}
        </h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          
         
          <div className="form-group">
            <label>Email</label>
            <input  type="email"  name="Mail"  value={formData.Mail}  onChange={handleChange}  placeholder="exemple@email.com"  required />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="••••••••" 
              required 
            />
          </div>

          
          {isRegister && (
            <>
              <div className="form-group">
            <label>Login</label>
            <input  type="text"  name="login"  value={formData.login}  onChange={handleChange}  placeholder="login"  required />
          </div>

              <div className="form-group">
                <label>Sexe</label>
                <div className="gender-options">
                  <label className="radio-label">
                    <input 
                      type="radio" name="gender" 
                      value="Homme" 
                      checked={formData.gender === 'Homme'} 
                      onChange={handleChange} 
                      required 
                    />
                    Homme
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="gender"  value="Femme" checked={formData.gender === 'Femme'} 
                      onChange={handleChange} 
                      required 
                    />
                    Femme
                  </label>
                </div>
              </div>
            </>
          )}

          
          <button type="submit" className="submit-btn">
            {isRegister ? "S'inscrire" : "Valider"}
          </button>
        </form>        
        <div className="toggle-auth">
          {isRegister ? (
            <p>
              Déjà un compte ?{" "}<span onClick={() => setIsRegister(false)} className="toggle-link">
                Se connecter
              </span>
            </p>
          ) : (
            <p>  Nouveau ici ?{" "} <span onClick={() => setIsRegister(true)} className="toggle-link">
                Créer un compte
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;