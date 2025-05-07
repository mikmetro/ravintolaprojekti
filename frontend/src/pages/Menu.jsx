import {useState, useEffect} from 'react';
import '../css/menu.css';
import MenuItem from '../components/MenuItem';
import OrderItemModal from '../components/OrderItemModal';
import {useItem} from '../hooks/useItem';

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuData, setMenuData] = useState();
  const {getItems} = useItem();

  useEffect(() => {
    (async () => {
      const menuData = await getItems();
      setMenuData(menuData.data);
    })();
  }, []);

  return (
    <section className="menu-wrapper">
      {menuData ? (
        Object.entries(menuData).map(([k, v]) => {
          return (
            <div key={k} className="menu-category">
              <h2 className="menu-category-title">{k}</h2>
              <div className="menu-category-items">
                {Object.values(v).map((item) => (
                  <MenuItem
                    itemName={item.name}
                    description={item.description}
                    price={item.price}
                    setSelectedItem={() => setSelectedItem(item)}
                    key={item.id}
                  />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="menu-loading-text">Haetaan ruokalistaa...</h2>
      )}
      {selectedItem && (
        <OrderItemModal
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </section>
  );
}
