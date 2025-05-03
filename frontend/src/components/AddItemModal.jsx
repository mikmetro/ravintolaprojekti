import {useItem} from '../hooks/useItem.js';
import useForm from '../hooks/formHooks.js';
import AdminInput from './ui/AdminInput.jsx';
import Button from './ui/Button';
import SelectCategory from './ui/SelectCategory.jsx';
import './admin-modal.css';

export default function AddItemModal(props) {
  const {postItem} = useItem();
  const initValues = {
    name: '',
    price: '',
    category: '',
    description: '',
    status: 'active',
  };

  const addItem = async () => {
    console.log(inputs);
    const postResult = await postItem(inputs);
    props.refreshMenu();
    props.onClose();
    console.log('postResult', postResult);
  };
  const {inputs, handleInputChange, handleSubmit} = useForm(
    addItem,
    initValues
  );
  return (
    <dialog open className="admin-item-dialog">
      <h3>Lisää tuote</h3>
      <form onSubmit={handleSubmit} className="admin-item-form">
        <div>
          <label htmlFor="addName">Nimi</label>
          <AdminInput
            name="name"
            type="text"
            id="addName"
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
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <SelectCategory onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="addDescription">Kuvaus</label>
          <AdminInput
            name="description"
            type="text"
            id="addDescription"
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
        <button type="submit">Lisää tuote</button>
      </form>
      <button
        className="cancel-button"
        onClick={() => {
          props.onClose();
        }}
      >
        Peruuta
      </button>
    </dialog>
  );
}
