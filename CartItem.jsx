import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateItemTotal = (item) => item.cost * item.quantity;

  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 && <p className="cart-empty">Your cart is empty.</p>}

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit price: ${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="qty-button" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>-</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-button" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateItemTotal(item)}</div>
            </div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button className="continue-button" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
