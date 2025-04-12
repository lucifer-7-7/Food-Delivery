import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [deliveryFee, setDeliveryFee] = useState(40);

  
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    const subtotal = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    
    
    const discountAmount = isPromoApplied ? subtotal * (discount / 100) : 0;
    
 
    const total = subtotal - discountAmount + (deliveryOption === 'delivery' ? deliveryFee : 0);
    
    setTotalAmount(total);
  }, [cart, discount, isPromoApplied, deliveryOption, deliveryFee]);

  
  const handleQuantityChange = (itemId, action) => {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      
      if (action === 'add') {
        updatedCart[itemIndex].quantity += 1;
      } else if (action === 'subtract' && updatedCart[itemIndex].quantity > 1) {
        updatedCart[itemIndex].quantity -= 1;
      } else if (action === 'subtract' && updatedCart[itemIndex].quantity === 1) {
      
        updatedCart.splice(itemIndex, 1);
      }
      
      setCart(updatedCart);
    }
  };

  
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    
    if (updatedCart.length === 0) {
      localStorage.removeItem('cart');
    }
  };

 
  const applyPromoCode = () => {
 
    const promoCodes = {
      'WELCOME10': 10,
      'SPECIAL25': 25,
      'FREESHIP': 100  
    };
    
    if (promoCodes[promoCode]) {
      setDiscount(promoCodes[promoCode]);
      setIsPromoApplied(true);
      
     
      if (promoCode === 'FREESHIP') {
        setDeliveryFee(0);
      }
    } else {
      alert('Invalid promo code');
    }
  };

  
  const handleContinueShopping = () => {
    navigate('/order');
  };

  
  const handleCheckout = () => {
   
    alert(`Thank you for your order! Total: ₹${totalAmount}`);
    setCart([]);
    localStorage.removeItem('cart');
    navigate('/');
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
      localStorage.removeItem('cart');
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <button className="back-button" onClick={handleContinueShopping}>
            <i className="bi bi-arrow-left"></i> Continue Shopping
          </button>
          <h1>Your Cart</h1>
          <p>Review and modify your selected items before checkout</p>
        </div>
        
        {cart.length === 0 ? (
          <div className="empty-cart-message" data-aos="fade-up">
            <i className="bi bi-cart-x"></i>
            <h3>Your cart is empty</h3>
            <p>Add some delicious items to get started</p>
            <button className="browse-menu-button" onClick={handleContinueShopping}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section" data-aos="fade-up">
              <div className="cart-items-header">
                <div className="item-col">Item</div>
                <div className="price-col">Price</div>
                <div className="quantity-col">Quantity</div>
                <div className="subtotal-col">Subtotal</div>
                <div className="action-col"></div>
              </div>
              
              {cart.map(item => (
                <div className="cart-item-row" key={item.id}>
                  <div className="item-col">
                    <div className="item-info">
                      <img src={`/img/menu/${item.img}`} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-description">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="price-col">₹{item.price}</div>
                  
                  <div className="quantity-col">
                    <div className="quantity-selector">
                      <button onClick={() => handleQuantityChange(item.id, 'subtract')}>
                        <i className="bi bi-dash"></i>
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 'add')}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="subtotal-col">₹{item.price * item.quantity}</div>
                  
                  <div className="action-col">
                    <button className="remove-item-button" onClick={() => removeFromCart(item.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="cart-actions">
                <button className="clear-cart-button" onClick={clearCart}>
                  <i className="bi bi-x-circle"></i> Clear Cart
                </button>
              </div>
            </div>
            
            <div className="cart-summary" data-aos="fade-up" data-aos-delay="100">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</span>
              </div>
              
              {isPromoApplied && (
                <div className="summary-row discount">
                  <span>Discount:</span>
                  <span>-₹{(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) * (discount / 100)).toFixed(2)}</span>
                </div>
              )}
              
              <div className="delivery-options">
                <h4>Delivery Options</h4>
                <div className="delivery-option">
                  <input 
                    type="radio" 
                    id="delivery" 
                    name="delivery-option" 
                    value="delivery" 
                    checked={deliveryOption === 'delivery'} 
                    onChange={() => setDeliveryOption('delivery')}
                  />
                  <label htmlFor="delivery">Home Delivery (₹{deliveryFee})</label>
                </div>
                <div className="delivery-option">
                  <input 
                    type="radio" 
                    id="pickup" 
                    name="delivery-option" 
                    value="pickup" 
                    checked={deliveryOption === 'pickup'} 
                    onChange={() => setDeliveryOption('pickup')}
                  />
                  <label htmlFor="pickup">Self Pickup (Free)</label>
                </div>
              </div>
              
              <div className="promo-code-section">
                <h4>Promo Code</h4>
                <div className="promo-input">
                  <input 
                    type="text" 
                    placeholder="Enter promo code" 
                    value={promoCode} 
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    disabled={isPromoApplied}
                  />
                  {isPromoApplied ? (
                    <button 
                      className="promo-button applied" 
                      onClick={() => {setIsPromoApplied(false); setDiscount(0); setPromoCode(''); setDeliveryFee(40);}}
                    >
                      Remove
                    </button>
                  ) : (
                    <button className="promo-button" onClick={applyPromoCode}>Apply</button>
                  )}
                </div>
                {isPromoApplied && (
                  <div className="promo-applied-message">
                    <i className="bi bi-check-circle"></i> {discount}% discount applied
                  </div>
                )}
              </div>
              
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;