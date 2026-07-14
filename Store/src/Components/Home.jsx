import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
    
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">Nouvelle Collection 2026</span>
          <h1 className="hero-title">Trouvez Votre Style Unique</h1>
          <p className="hero-description">
            Découvrez les dernières tendances de mode sélectionnées spécialement pour vous avec des prix exceptionnels.
          </p>
          <button className="hero-btn" onClick={() => navigate('/clothes/Women')}>
            Acheter Maintenant ➔
          </button>
        </div>
      </section>

     
      <section className="features-bar">
        <div className="feature-item">
          <span className="feature-icon">🚚</span>
          <div>
            <h3>Livraison Rapide</h3>
            <p>Sur toute la Tunisie</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🛡️</span>
          <div>
            <h3>Paiement Sécurisé</h3>
            <p>Paiement à la livraison</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">✨</span>
          <div>
            <h3>Qualité Garantie</h3>
            <p>Articles 100% authentiques</p>
          </div>
        </div>
      </section>

     
      <section className="categories-section">
        <h2 className="section-title">Nos Catégories</h2>
        <div className="categories-grid">
          
         
          <div className="category-card card-women" onClick={() => navigate('/clothes/Women')}>
            <div className="category-overlay"></div>
            <div className="category-info">
              <h3>Femmes</h3>
              <span>Découvrir ➔</span>
            </div>
          </div>

         
          <div className="category-card card-men" onClick={() => navigate('/clothes/Men')}>
            <div className="category-overlay"></div>
            <div className="category-info">
              <h3>Hommes</h3>
              <span>Découvrir ➔</span>
            </div>
          </div>

          <div className="category-card card-kids" onClick={() => navigate('/clothes/Kids')}>
            <div className="category-overlay"></div>
            <div className="category-info">
              <h3>Enfants</h3>
              <span>Découvrir ➔</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;