import React, {useState} from 'react';
import './menu.css';
import MenuItem from '../components/MenuItem';
import OrderItemModal from '../components/OrderItemModal';

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
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="menu-wrapper">
      {Object.entries(mockData).map(([k, v]) => {
        return (
          <div key={k} className="menu-category">
            <h2 className="menu-category-title">{k}</h2>
            <div className="menu-category-items">
              {Object.entries(v).map(([itemName, {description, price}], i) => (
                <MenuItem
                  itemName={itemName}
                  description={description}
                  price={price}
                  setSelectedItem={setSelectedItem}
                  key={i}
                />
              ))}
            </div>
          </div>
        );
      })}
      <OrderItemModal selectedItem={selectedItem} />
    </section>
  );
}
