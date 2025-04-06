import './menu.css';

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

export default function Menu() {
  return (
    <section className="menu-wrapper">
      {Object.entries(mockData).map(([k, v]) => {
        return (
          <div key={k} className="menu-category">
            <h2 className="menu-category-title">{k}</h2>
            <div className="menu-category-items">
              {Object.entries(v).map(([itemName, {description, price}]) => (
                <>
                  <div>
                    <p className="menu-item-name">{itemName}</p>
                    <p className="menu-item-description">{description}</p>
                  </div>
                  <p className="menu-item-price">{price}€</p>
                </>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
