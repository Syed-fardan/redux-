import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartSliceAction } from '../../store/cart-slice';
const CartItem = (props) => {
  const dispatch= useDispatch();
  const { title, quantity, total, price, id } = props.item;
  const addToCartHandler=()=>{
    dispatch(cartSliceAction.addItemToCart({
      title,
      id,
      price,
    }));
  }
  const removeCartHandler =()=>{
 dispatch(cartSliceAction.removeItemCard(id))
  }
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeCartHandler} >-</button>
          <button onClick ={addToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
