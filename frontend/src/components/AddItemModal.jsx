import {useItem} from '../hooks/useItem.js';
import useForm from '../hooks/formHooks.js';
import Input from './ui/Input.jsx';
import Button from './ui/Button';
import SelectCategory from './ui/SelectCategory.jsx';

export default function AddItemModal({onClose}) {
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
    onClose();
    console.log('postResult', postResult);
  };
  const {inputs, handleInputChange, handleSubmit} = useForm(
    addItem,
    initValues
  );
  return (
    <dialog open>
      <h3>Lisää tuote</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="addName">Nimi</label>
          <Input
            name="name"
            type="text"
            id="addName"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="addPrice">Hinta</label>
          <Input
            name="price"
            type="text"
            id="addPrice"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <SelectCategory onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="addDescription">Kuvaus</label>
          <Input
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
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <Button type="submit">Lisää tuote</Button>
      </form>
      <Button
        onClick={() => {
          onClose();
        }}
      >
        Peruuta
      </Button>
    </dialog>
  );
}
