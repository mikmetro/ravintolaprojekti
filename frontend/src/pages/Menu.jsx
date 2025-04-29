import {useState, useEffect} from 'react';
import '../css/menu.css';
import MenuItem from '../components/MenuItem';
import OrderItemModal from '../components/OrderItemModal';
import {useItem} from '../hooks/useItem';

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);
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
      {Object.entries(menuData).map(([k, v]) => {
        return (
          <div key={k} className="menu-category">
            <h2 className="menu-category-title">{k}</h2>
            <div className="menu-category-items">
              {Object.values(v).map(({name, description, price}, i) => (
                <MenuItem
                  itemName={name}
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
