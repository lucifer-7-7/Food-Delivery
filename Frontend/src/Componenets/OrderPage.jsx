import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu-starters');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

 
  const menuCategories = [
    { id: 'menu-starters', title: 'Starters', icon: 'bi-egg-fried' },
    { id: 'menu-breakfast', title: 'Breakfast', icon: 'bi-cup-hot' },
    { id: 'menu-lunch', title: 'Lunch', icon: 'bi-cup-straw' },
    { id: 'menu-dinner', title: 'Dinner', icon: 'bi-palette' }
  ];

  const menuItems = {
    'menu-starters': [
      { id: 1, name: "Bruschetta", description: "Toasted bread with fresh tomatoes, garlic, basil, and olive oil", price: 100, img: "menu-item-1.png" },
      { id: 2, name: "Fried Calamari", description: "Lightly breaded squid served with marinara sauce", price: 200, img: "menu-item-2.png" },
      { id: 3, name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze", price: 300, img: "menu-item-3.png" },
      { id: 4, name: "Stuffed Mushrooms", description: "Mushroom caps filled with seasoned breadcrumbs and cheese", price: 400, img: "menu-item-4.png" },
      { id: 5, name: "Shrimp Cocktail", description: "Chilled jumbo shrimp with zesty cocktail sauce", price: 500, img: "menu-item-5.png" },
      { id: 6, name: "Spinach Artichoke Dip", description: "Creamy dip with spinach, artichokes, and melted cheese", price: 600, img: "menu-item-6.png" },
    ],
    'menu-breakfast': [
      { id: 7, name: "Eggs Benedict", description: "Poached eggs on English muffin with hollandaise sauce", price: 900, img: "menu-item-5.png" },
      { id: 8, name: "Belgian Waffles", description: "Fluffy waffles topped with fresh berries and maple syrup", price: 700, img: "menu-item-6.png" },
      { id: 9, name: "Avocado Toast", description: "Whole grain toast with smashed avocado, eggs, and red pepper flakes", price: 800, img: "menu-item-1.png" },
      { id: 10, name: "Classic Omelette", description: "Three-egg omelette with cheese, ham, and seasonal vegetables", price: 1000, img: "menu-item-2.png" },
      { id: 11, name: "Pancake Stack", description: "Buttermilk pancakes with butter and pure maple syrup", price: 600, img: "menu-item-3.png" },
      { id: 12, name: "Breakfast Burrito", description: "Scrambled eggs, sausage, peppers, and cheese in a flour tortilla", price: 1100, img: "menu-item-4.png" },
    ],
    'menu-lunch': [
      { id: 13, name: "Chicken Caesar Wrap", description: "Grilled chicken, romaine, parmesan in a flour tortilla", price: 1100, img: "menu-item-3.png" },
      { id: 14, name: "Turkey Club Sandwich", description: "Triple-decker with turkey, bacon, lettuce, and tomato", price: 1200, img: "menu-item-4.png" },
      { id: 15, name: "Mushroom Risotto", description: "Arborio rice slowly cooked with wild mushrooms and parmesan", price: 1300, img: "menu-item-5.png" },
      { id: 16, name: "Greek Salad", description: "Tomatoes, cucumber, olives, feta, and red onion with oregano", price: 1000, img: "menu-item-6.png" },
      { id: 17, name: "Fish Tacos", description: "Grilled fish, cabbage slaw, and chipotle aioli in corn tortillas", price: 1400, img: "menu-item-1.png" },
      { id: 18, name: "Veggie Burger", description: "House-made plant-based patty with all the fixings", price: 1200, img: "menu-item-2.png" },
    ],
    'menu-dinner': [
      { id: 19, name: "Filet Mignon", description: "8oz tenderloin with mashed potatoes and seasonal vegetables", price: 3000, img: "menu-item-2.png" },
      { id: 20, name: "Grilled Salmon", description: "Wild-caught salmon with lemon butter sauce and asparagus", price: 2200, img: "menu-item-1.png" },
      { id: 21, name: "Chicken Parmesan", description: "Breaded chicken breast topped with marinara and mozzarella", price: 1700, img: "menu-item-6.png" },
      { id: 22, name: "Eggplant Lasagna", description: "Layers of eggplant, ricotta, mozzarella, and tomato sauce", price: 1500, img: "menu-item-5.png" },
      { id: 23, name: "Shrimp Scampi", description: "Jumbo shrimp in garlic butter sauce over linguine", price: 2000, img: "menu-item-4.png" },
      { id: 24, name: "Prime Rib", description: "Slow-roasted prime rib with au jus and horseradish cream", price: 2700, img: "menu-item-3.png" },
    ],
  };

  
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      
      
      const total = JSON.parse(storedCart).reduce((acc, item) => {
        return acc + (item.price * item.quantity);
      }, 0);
      setTotalAmount(total);
    }
  }, []);

  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({
      top: document.getElementById('menu-tabs').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  
  const handleBackToMenu = () => {
    navigate('/');
  };

  
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

 
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
      
      updateCart(updatedCart);
    }
  };

  
  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
    
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      updateCart(updatedCart);
    } else {
      
      updateCart([...cart, { ...item, quantity: 1 }]);
    }
    
    
    const notification = document.getElementById('cart-notification');
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  };

  
  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    setTotalAmount(total);
  }, [cart]);

  
  const handleCheckout = () => {
    navigate('/cart');
    setCartOpen(false);
  };

  return (
    <div className="order-page">
      
      <div id="cart-notification" className="cart-notification">
        <i className="bi bi-check-circle"></i> Item added to cart
      </div>
      
    
      <div className="cart-section">
        <div className="cart-toggle" onClick={() => setCartOpen(!cartOpen)}>
          <i className="bi bi-cart3"></i>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </div>
        <Link to="/cart" className="view-cart-link">
          <i className="bi bi-bag"></i> View Cart
        </Link>
      </div>
      
      
      <div className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Order</h3>
          <button className="close-cart" onClick={() => setCartOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="bi bi-cart-x"></i>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img">
                    <img src={`/img/menu/${item.img}`} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <div className="cart-item-price">₹{item.price} × {item.quantity}</div>
                  </div>
                  <div className="cart-item-quantity">
                    <button onClick={() => handleQuantityChange(item.id, 'subtract')}>
                      <i className="bi bi-dash"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 'add')}>
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="cart-total">
                <div className="total-label">Total Amount:</div>
                <div className="total-amount">₹{totalAmount}</div>
              </div>
              
              <div className="cart-actions">
                <button className="checkout-button" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
                <Link to="/cart" className="view-full-cart-button" onClick={() => setCartOpen(false)}>
                  View Full Cart
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      
      
      <div className="container">
        <div className="order-header">
          <button className="back-button" onClick={handleBackToMenu}>
            <i className="bi bi-arrow-left"></i> Back to Menu
          </button>
          <h1>Order Your Food</h1>
          <p>Select your favorite dishes and customize your order</p>
        </div>
        
       
        <div className="menu-tabs-wrapper" id="menu-tabs" data-aos="fade-up" data-aos-delay="100">
          <ul className="menu-tabs">
            {menuCategories.map((category) => (
              <li key={category.id} className="menu-tab-item">
                <button 
                  className={`menu-tab-button ${activeTab === category.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(category.id)}
                >
                  <i className={`bi ${category.icon}`}></i>
                  <h4>{category.title}</h4>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
       
        <div className="menu-content" data-aos="fade-up" data-aos-delay="200">
          {menuCategories.map((category) => (
            <div 
              key={category.id}
              className={`menu-tab-content ${activeTab === category.id ? 'active' : ''}`}
              id={category.id}
            >
              <div className="menu-header">
                <p>Our Selection</p>
                <h3>{category.title}</h3>
              </div>
              
              <div className="order-items-grid">
                {menuItems[category.id].map((item) => {
                  
                  const cartItem = cart.find(cartItem => cartItem.id === item.id);
                  const quantity = cartItem ? cartItem.quantity : 0;
                  
                  return (
                    <div className="order-item" key={item.id}>
                      <div className="order-item-img-container">
                        <img
                          src={`/img/menu/${item.img}`}
                          className="order-img"
                          alt={item.name}
                        />
                        <div className="order-item-overlay">
                          <button className="view-details-button">
                            <i className="bi bi-eye"></i>
                          </button>
                        </div>
                      </div>
                      <div className="order-item-info">
                        <h4>{item.name}</h4>
                        <p className="ingredients">{item.description}</p>
                        <p className="price">₹{item.price}</p>
                        
                        <div className="order-actions">
                          {quantity > 0 ? (
                            <div className="quantity-selector">
                              <button onClick={() => handleQuantityChange(item.id, 'subtract')}>
                                <i className="bi bi-dash"></i>
                              </button>
                              <span>{quantity}</span>
                              <button onClick={() => handleQuantityChange(item.id, 'add')}>
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          ) : (
                            <button className="add-to-cart-button" onClick={() => addToCart(item)}>
                              <i className="bi bi-cart-plus"></i> Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;