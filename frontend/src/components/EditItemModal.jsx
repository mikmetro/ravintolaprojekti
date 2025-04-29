import {useItem} from '../hooks/useItem.js';
import useForm from '../hooks/formHooks.js';
import Input from './ui/Input.jsx';
import Button from './ui/Button';

export default function EditItemModal(props) {
  const {putItem} = useItem();
  /*const getInitial = async ()=>{
    const item = await getItemById(props.selectedItem)

  }*/
  console.log(props);
  const initValues = {
    name: '',
    price: '',
    category: '',
    description: '',
    status: 'active',
  };

  const editItem = async () => {
    console.log(inputs);
    const putResult = await putItem(inputs, props.selectedItem);
    props.onClose();
    console.log('putResult', putResult);
  };
  const {inputs, handleInputChange, handleSubmit} = useForm(
    editItem,
    initValues
  );
  return (
    <dialog open>
      <h3>Muokkaa</h3>
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
          <label htmlFor="addCategory">Kategoria</label>
          <Input
            name="category"
            type="text"
            id="addCategory"
            onChange={handleInputChange}
          />
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
        <Button type="submit">Muokkaa</Button>
      </form>
      <Button
        onClick={() => {
          props.onClose();
        }}
      >
        Peruuta
      </Button>
    </dialog>
  );
}
