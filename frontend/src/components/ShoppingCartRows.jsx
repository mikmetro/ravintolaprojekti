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
    // Increment the quantity
    if (quantity >= 99) return; // Prevent incrementing beyond 99
    incrementValue();
    setItem(cartItem.id, quantity + 1);
  };

  const handleDecrement = () => {
    // Decrement the quantity
    if (quantity <= 1) return; // Prevent decrementing below 1
    decrementValue();
    setItem(cartItem.id, quantity - 1);
  };

  return (
    <tr key={cartItem.id}>
      <td>{cartItem.name}</td>
      <td>{cartItem.price}€</td>
      <td>
        <div className="shopping-cart-actions">
          <Spinner
            value={quantity}
            incrementValue={handleIncrement}
            decrementValue={handleDecrement}
          />
          <Button
            color="red"
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to remove this item from the cart?'
                )
              ) {
                setItem(cartItem.id, 0);
              }
            }}
          >
            Poista
          </Button>
        </div>
      </td>
    </tr>
  );
}
