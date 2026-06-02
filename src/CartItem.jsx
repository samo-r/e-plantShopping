import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const parseCost = (cost) => parseFloat(String(cost).replace(/[^0-9.]/g, ''));

const formatMoney = (amount) => amount.toFixed(2);

const CartItem = ({ onContinueShopping, onItemRemoved }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0);

  const calculateTotalCost = (item) => parseCost(item.cost) * item.quantity;

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    if (onItemRemoved) {
      onItemRemoved(item.name);
    }
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${formatMoney(calculateTotalAmount())}
      </h2>
      <div>
        {cart.length === 0 ? (
          <p style={{ color: 'black' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    type="button"
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Subtotal: ${formatMoney(calculateTotalCost(item))}
                </div>
                <button
                  type="button"
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="continue_shopping_btn">
        <button type="button" className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button type="button" className="get-started-button1">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
