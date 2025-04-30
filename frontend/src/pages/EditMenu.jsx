import Input from '../components/ui/Input';

import MenuItem from '../components/MenuItem';
import {useEffect, useState} from 'react';
import OrderItemModal from '../components/OrderItemModal';
import AddItemModal from '../components/AddItemModal';
import EditItemModal from '../components/EditItemModal';
import Button from '../components/ui/Button';
import EditMenuItem from '../components/EditMenuItem';
import {useItem} from '../hooks/useItem';
export default function EditMenu() {
  const [selectedItem, setSelectedItem] = useState(null);
  //const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [menuData, setMenuData] = useState({});
  const {getItems} = useItem();

  useEffect(() => {
    (async () => {
      const menuData = await getItems();
      setMenuData(menuData.data);
      console.log(menuData.data);
    })();
  }, []);

  return (
    <section className="menu-wrapper">
      <Button onClick={() => setShowAdd(true)}>Lisää tuote</Button>
      {showAdd && <AddItemModal onClose={() => setShowAdd(false)} />}
      {showEdit && (
        <EditItemModal
          selectedItem={selectedItem}
          onClose={() => setShowEdit(false)}
        />
      )}
      {Object.entries(menuData).map(([k, v]) => {
        return (
          <div key={k} className="menu-category">
            <h2 className="menu-category-title">{k}</h2>
            <div className="menu-category-items">
              {Object.values(v).map(({name, description, price, id}, i) => (
                <EditMenuItem
                  itemName={name}
                  description={description}
                  price={price}
                  setSelectedItem={setSelectedItem}
                  setShowEdit={setShowEdit}
                  category={k}
                  itemId={id}
                  key={i}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

/*const mockData = {
    Pizza: {
      Pepperoni: {
        description: 'Pepperoni, Red onion',
        price: 9.99,
        category: 'pizza',
        itemId: 1,
      },
      Kebab: {
        description: 'Kebab, Red onion',
        price: 9.99,
        category: 'pizza',
        itemId: 2,
      },
      'Special Opera': {
        description: 'Garlic',
        price: 39.99,
        category: 'pizza',
        itemId: 3,
      },
    },
    Kebab: {
      'Kebab Ranskalaisilla': {
        description: 'Kebab Ranskalaisilla',
        price: 999.99,
        category: 'kebab',
        itemId: 4,
      },
      'Kebab Riisillä': {
        description: 'Kebab riisillä',
        price: 999.99,
        category: 'kebab',
        itemId: 5,
      },
    },
    Juomat: {
      'Cola 1,5l': {
        description: '',
        price: 41.99,
        category: 'juoma',
        itemId: 6,
      },
    },
  };*/
