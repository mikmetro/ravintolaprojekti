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
  //const [showEdit, setShowEdit] = useState(false);
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
      {Object.entries(menuData).map(([k, v]) => {
        const matchedCategory = categories.find(
          (category) => category.name === k
        );
        if (!matchedCategory) return null;
        return (
          <div key={k} className="edit-menu-category">
            <div
              className={
                matchedCategory.status === 'active'
                  ? 'edit-menu-category-title active'
                  : 'edit-menu-category-title inactive'
              }
            >
              <h2>{k}</h2>
              {matchedCategory.status === 'active' ? (
                <>
                  <p>Käytössä</p>
                  <button
                    className="edit-menu-category-button red"
                    onClick={async () => {
                      changeCategoryStatus(matchedCategory.id, 'inactive');
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
                      changeCategoryStatus(matchedCategory.id, 'active');
                    }}
                  >
                    Ota käyttöön
                  </button>
                </>
              )}
            </div>
            <div className="edit-menu-category-items">
              {Object.values(v).map(
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
