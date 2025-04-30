import ShoppingCartRows from '../components/shoppingCartRows';
console.log('shoppingCartRows');
const mockData = {
  Pizza: {
    Pepperoni: {
      description: 'Pepperoni, Red onion',
      price: 9.99,
    },
    Kebab: {
      description: 'Kebab, Red onion',
      price: 9.99,
    },
    'Special Opera': {
      description: 'Garlic',
      price: 39.99,
    },
  },
  Kebab: {
    'Kebab Ranskalaisilla': {
      description: 'Kebab Ranskalaisilla',
      price: 999.99,
    },
    'Kebab Riisillä': {
      description: 'Kebab riisillä',
      price: 999.99,
    },
  },
  Juomat: {
    'Cola 1,5l': {
      description: '',
      price: 41.99,
    },
  },
};

//TODO: get data from context
//TODO: send order to backend
function ShoppingCart() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <ShoppingCartRows item={mockData} />
      </table>
      <button>Maksamaan</button>
    </>
  );
}
export default ShoppingCart;
