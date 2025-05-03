import {useItem} from '../hooks/useItem.js';
import useForm from '../hooks/formHooks.js';
import AdminInput from './ui/AdminInput.jsx';
import Button from './ui/Button';
import SelectCategory from './ui/SelectCategory.jsx';

export default function EditItemModal(props) {
  const {putItem} = useItem();
  /*const getInitial = async ()=>{
    const item = await getItemById(props.selectedItem)

  }*/

  const initValues = {
    name: props.selectedItem.itemName,
    price: props.selectedItem.price,
    category: props.selectedItem.category,
    description: props.selectedItem.description,
    status: 'active',
  };

  const editItem = async () => {
    const putResult = await putItem(inputs, props.selectedItem.itemId);
    props.refreshMenu();
    props.onClose();
    console.log('putResult', putResult);
  };
  const {inputs, handleInputChange, handleSubmit} = useForm(
    editItem,
    initValues
  );

  return (
    <dialog open className="admin-item-dialog">
      <h3>Muokkaa</h3>
      <form onSubmit={handleSubmit} className="admin-item-form">
        <div>
          <label htmlFor="addName">Nimi</label>
          <AdminInput
            name="name"
            type="text"
            id="addName"
            defaultValue={props.selectedItem.itemName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="addPrice">Hinta</label>
          <AdminInput
            name="price"
            type="number"
            id="addPrice"
            defaultValue={props.selectedItem.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <SelectCategory
            onChange={handleInputChange}
            initialValue={props.selectedItem.categoryId}
          />
        </div>
        <div>
          <label htmlFor="addDescription">Kuvaus</label>
          <AdminInput
            name="description"
            type="textarea"
            id="addDescription"
            defaultValue={props.selectedItem.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="addStatus">Status</label>
          <select
            name="status"
            id="addStatus"
            defaultValue="active"
            onChange={handleInputChange}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Muokkaa</button>
      </form>
      <button
        onClick={() => {
          props.onClose();
        }}
        className="cancel-button"
      >
        Peruuta
      </button>
    </dialog>
  );
}
