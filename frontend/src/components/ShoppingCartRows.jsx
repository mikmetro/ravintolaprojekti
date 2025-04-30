export default function ShoppingCartRows(props) {
  const cartItems = props.items;

  //TODO: get data to display
  return (
    <>
      {cartItems ? (
        <tbody>
          {cartItems.map((items) =>
            items.map(([name, details]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{details.price}</td>
                <td>1</td> {/* Example quantity */}
              </tr>
            ))
          )}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td>No items in cart</td>
          </tr>
        </tbody>
      )}
    </>
  );
}
