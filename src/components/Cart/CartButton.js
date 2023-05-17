import classes from './CartButton.module.css';
import { uiSliceAction } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const toggleButtonHandler = () => {
    dispatch(uiSliceAction.toggle());
    
  };
  return (
    <button className={classes.button} onClick={toggleButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
