import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('photo-1593482892290-f54927ae1bb6'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: img('photo-1572688484438-313a6e50c333'), description: 'Filters formaldehyde and xylene.', cost: 12 },
      { name: 'Peace Lily', image: img('photo-1593691509543-c55fb32d8de5'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: img('photo-1545241047-6083a3684587'), description: 'Adds humidity and removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: img('photo-1614594975525-e45190c55d0b'), description: 'Absorbs airborne chemicals and thrives indoors.', cost: 17 },
      { name: 'Aloe Vera', image: img('photo-1509423350716-97f9360b4e09'), description: 'Purifies air and soothes minor burns.', cost: 14 },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      { name: 'ZZ Plant', image: img('photo-1632207691143-643e2a9a9361'), description: 'Tolerates dim corners and skipped waterings.', cost: 25 },
      { name: 'Cast Iron Plant', image: img('photo-1459156212016-c812468e2115'), description: 'Nearly indestructible in low light.', cost: 22 },
      { name: 'Pothos', image: img('photo-1596724878582-76f3d8f3b1d9'), description: 'Trailing vines that grow in shade.', cost: 10 },
      { name: 'Chinese Evergreen', image: img('photo-1598880940080-ff9a29891b85'), description: 'Patterned leaves, easy care.', cost: 19 },
      { name: 'Dracaena', image: img('photo-1620127682229-33388276e540'), description: 'Tall and elegant, happy in low light.', cost: 28 },
      { name: 'Philodendron', image: img('photo-1572688484438-313a6e50c333'), description: 'Heart-shaped leaves, forgiving and fast growing.', cost: 16 },
    ],
  },
  {
    category: 'Pet Friendly Plants',
    plants: [
      { name: 'Parlor Palm', image: img('photo-1512428813834-c702c7702b78'), description: 'Non-toxic to cats and dogs.', cost: 21 },
      { name: 'Calathea', image: img('photo-1637967886160-fd78dc3ce3f5'), description: 'Striking foliage that is safe for pets.', cost: 24 },
      { name: 'Areca Palm', image: img('photo-1598880940371-c756e015faf1'), description: 'Feathery fronds, pet safe.', cost: 30 },
      { name: 'Bamboo Palm', image: img('photo-1463320726281-696a485928c7'), description: 'Tropical look and non-toxic.', cost: 26 },
      { name: 'Money Tree', image: img('photo-1509423350716-97f9360b4e09'), description: 'Braided trunk, safe for pets.', cost: 27 },
      { name: 'Prayer Plant', image: img('photo-1416879595882-3373a0480b5b'), description: 'Leaves fold up at night; pet friendly.', cost: 18 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const navbar = (
    <nav className="navbar">
      <div className="nav-brand" onClick={onHomeClick} role="button" tabIndex={0}>
        Paradise Nursery
      </div>
      <div className="nav-links">
        <a href="#home" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
        <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
        <a
          href="#cart"
          className="cart-link"
          onClick={(e) => { e.preventDefault(); setShowCart(true); }}
          aria-label={`Cart, ${totalQuantity} items`}
        >
          <svg viewBox="0 0 256 256" height="28" width="28" aria-hidden="true">
            <circle cx="80" cy="216" r="12" fill="#fff" />
            <circle cx="184" cy="216" r="12" fill="#fff" />
            <path
              d="M42.3 72H221.7l-25.5 92.7a16 16 0 0 1-15.4 11.3H83.2a16 16 0 0 1-15.4-11.3L32.5 32H8"
              fill="none" stroke="#fff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          <span className="cart-count">{totalQuantity}</span>
        </a>
      </div>
    </nav>
  );

  if (showCart) {
    return (
      <div>
        {navbar}
        <CartItem onContinueShopping={() => setShowCart(false)} />
      </div>
    );
  }

  return (
    <div>
      {navbar}
      <main className="product-grid-container">
        {plantsArray.map((group) => (
          <section key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => {
                const added = isInCart(plant.name);
                return (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <div className="product-price">${plant.cost}</div>
                    <button
                      className={`product-button ${added ? 'added' : ''}`}
                      disabled={added}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
