import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import '../CSS/Header.css'
function Header({isLoggedIn, setIsLoggedIn, userName, setUserName, setUserRole,handlelogout }) {
  
  const navigate=useNavigate() 

  return (
    <header className="main-header">
     
      <div className="header-top">
        <div className="logo-area">
          <h1>Joud Store</h1>
          {/* <img src="logo.png" alt="Logo" /> */}
        </div>
        
        <div className="user-actions">
           <NavLink className="action-link" to="/">Home</NavLink>
          <NavLink to='/card' className="action-link">🛒 My Cart</NavLink>
          {isLoggedIn ? (
            <div className="user-logged-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <span className="welcome-msg">👤 {userName}</span>
              <button onClick={handlelogout} className="logout-btn" style={{
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Logout
              </button>
            </div>
          ) : (
          <NavLink to='/login' className="action-link">Log in</NavLink>)}
        </div>
      </div>

     
      <nav className="header-bottom-nav">
        
        <NavLink className="category-btn" to="/clothes/Women">Woman</NavLink>
        <NavLink className="category-btn" to="/clothes/Men">Man</NavLink>
        <NavLink className="category-btn" to="/clothes/Kids">Kids</NavLink>
        <NavLink className="category-btn" to="/clothes/Accessories">Accessories</NavLink>
      </nav>
    </header>
  )
}

export default Header