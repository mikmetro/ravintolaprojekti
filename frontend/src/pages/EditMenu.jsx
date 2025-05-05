import {useEffect, useState} from 'react';
import AddItemModal from '../components/AddItemModal';
import EditItemModal from '../components/EditItemModal';
import Button from '../components/ui/Button';
import EditMenuItem from '../components/EditMenuItem';
import {useItem} from '../hooks/useItem';
import '../css/edit-menu.css';
import EditMenuButton from '../components/ui/EditMenuButton';
export default function EditMenu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [menuData, setMenuData] = useState({});
  const {getAllItems, getCategories, putCategory} = useItem();

  const loadMenuData = async () => {
    const menuData = await getAllItems();
    setMenuData(menuData.data);
    console.log(menuData.data);
  };
  useEffect(() => {
    loadMenuData();
  }, []);

  const [categories, setCategories] = useState([]);
  const loadCategories = async () => {
    const categories = await getCategories();
    setCategories(categories.data);
    console.log(categories.data);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const changeCategoryStatus = async (id, newStatus) => {
    const inputs = {
      status: newStatus,
    };
    console.log(id);
    const putResult = await putCategory(inputs, id);
    loadCategories();
    console.log('putResult', putResult);
  };

  return (
    <section className="edit-menu-wrapper">
      <Button onClick={() => setShowAdd(true)}>Lisää tuote</Button>
      {showAdd && (
        <AddItemModal
          onClose={() => setShowAdd(false)}
          refreshMenu={loadMenuData}
        />
      )}
      {showEdit && (
        <EditItemModal
          selectedItem={selectedItem}
          onClose={() => setShowEdit(false)}
          refreshMenu={loadMenuData}
        />
      )}
      {categories.map((category) => {
        const items = menuData[category.name];
        console.log('menuDate', menuData);
        console.log('items', items);
        if (!items) return null;

        return (
          <div key={category.id} className="edit-menu-category">
            <div
              className={
                category.status === 'active'
                  ? 'edit-menu-category-title active'
                  : 'edit-menu-category-title inactive'
              }
            >
              <h2>{category.name}</h2>
              {category.status === 'active' ? (
                <>
                  <p>Käytössä</p>
                  <button
                    className="edit-menu-category-button red"
                    onClick={async () => {
                      changeCategoryStatus(category.id, 'inactive');
                    }}
                  >
                    Piilota kategoria
                  </button>
                </>
              ) : (
                <>
                  <p>Ei käytössä</p>
                  <button
                    className="edit-menu-category-button green"
                    onClick={async () => {
                      changeCategoryStatus(category.id, 'active');
                    }}
                  >
                    Ota käyttöön
                  </button>
                </>
              )}
            </div>
            <div className="edit-menu-category-items">
              {Object.values(items).map(
                ({name, description, price, id, status, category_id}, i) => (
                  <EditMenuItem
                    itemName={name}
                    description={description}
                    price={price}
                    setSelectedItem={setSelectedItem}
                    setShowEdit={setShowEdit}
                    itemId={id}
                    status={status}
                    categoryId={category_id}
                    key={i}
                    refreshMenu={loadMenuData}
                  />
                )
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
