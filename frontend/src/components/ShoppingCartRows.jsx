import useSpinner from '../hooks/useSpinner';
import Spinner from './ui/Spinner';
import useCartContext from '../hooks/contextproviders/useCartContext';
import Button from './ui/Button';
import '../css/shoppingPage.css';

export default function ShoppingCartRows(props) {
  const cartItem = props.item;
  const {setItem} = useCartContext();

  const [quantity, incrementValue, decrementValue] = useSpinner(
    props.quantity,
    0,
    99
  );

  const handleIncrement = () => {
    incrementValue();
    setItem(cartItem.id, quantity + 1);
  };

  const handleDecrement = () => {
    decrementValue();
    setItem(cartItem.id, quantity - 1);
  };

  return (
    <tr key={cartItem.id}>
      <td>{cartItem.name}</td>
      <td>{cartItem.price}</td>
      <td>
        <div className="shopping-cart-actions">
          <Spinner
            value={quantity}
            incrementValue={handleIncrement}
            decrementValue={handleDecrement}
          />
          <Button color="red" onClick={() => setItem(cartItem.id, 0)}>
            Poista
          </Button>
        </div>
      </td>
    </tr>
  );
}
