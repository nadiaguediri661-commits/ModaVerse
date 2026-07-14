import React, { useState } from 'react';
import '../CSS/Card.css';

function Card({ card, setcard, userName }) {
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: userName || '', 
    phone: '',
    address: '',
    city: 'Tunis',
    paymentMethod: 'cod' 
  });

  
  let total = 0
  for(let i=0;i<card.length;i++){
    let p=card[i].price.replace("$","").trim()
    total+=Number(p)
  }
  

  const remove = (itemToRemove) => {
    setcard(card.filter(item => item !== itemToRemove));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

  
    setcard([]);
    setIsCheckingOut(false);
  };

  return (
   
    <div className="cart-container">
      <h2 className="cart-title">
        {userName ?  `${userName}` : ""}
      </h2>

      {card.length === 0 ? (
        <div className="empty-cart">
          <p>Votre panier est vide 🛒</p>
        </div>
      ) : (
        <div className="cart-content-layout">
          
          <div className="cart-items-section">
            <div className="cart-list">
              {card.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-image-wrapper">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">{item.price} DT</span>
                  </div>
                  <button className="del-btn" onClick={() => remove(item)}>❌</button>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="summary-box">
              <h3>Détails de la commande</h3>
              <div className="summary-row">
                <span>Sous-total:</span>
                <span>{total.toFixed(2)} DT</span>
              </div>
              <div className="summary-row">
                <span>Livraison:</span>
                <span className="free-shipping">Gratuite</span>
              </div>
              <div className="summary-row total-row">
                <span>Total à payer:</span>
                <span>{total.toFixed(2)} DT</span>
              </div>

             
              {!isCheckingOut ? (
                <button 
                  className="checkout-step-btn" 
                  onClick={() => setIsCheckingOut(true)}
                >
                  Passer la commande
                </button>
              ) : (
        
                <form onSubmit={handleConfirmOrder} className="checkout-form">
                  <h4>📍 Informations de Livraison</h4>
                  
                  <div className="form-field">
                    <label>Nom complet *</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={shippingInfo.fullName} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="form-field">
                    <label>Téléphone *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="Ex: 98 123 456"
                      value={shippingInfo.phone} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="form-field">
                    <label>Adresse exacte *</label>
                    <input 
                      type="text" 
                      name="address" 
                      placeholder="Rue, Immeuble, Appartement..."
                      value={shippingInfo.address} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="form-field">
                    <label>Ville *</label>
                    <select name="city" value={shippingInfo.city} onChange={handleInputChange}>
                      <option value="Tunis">Tunis</option>
                      <option value="Sousse">Sousse</option>
                      <option value="Sfax">Sfax</option>
                      <option value="Nabeul">Nabeul</option>
                      <option value="Bizerte">Bizerte</option>
                      <option value="Gabes">Gabès</option>
                    </select>
                  </div>

                  <h4>💳 Méthode de Paiement</h4>
                  <div className="payment-options">
                    <label className="payment-radio">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={shippingInfo.paymentMethod === 'cod'} 
                        onChange={handleInputChange} 
                      />
                      <span>Paiement à la livraison (COD)</span>
                    </label>
                    <label className="payment-radio">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card" 
                        checked={shippingInfo.paymentMethod === 'card'} 
                        onChange={handleInputChange} 
                      />
                      <span>Carte Bancaire</span>
                    </label>
                  </div>

                  <div className="checkout-actions">
                    <button type="submit" className="confirm-order-btn">
                      Confirmer mon achat
                      </button>
                    <button 
                      type="button" 
                      className="cancel-btn" 
                      onClick={() => setIsCheckingOut(false)}
                    >
                      Retour
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Card;