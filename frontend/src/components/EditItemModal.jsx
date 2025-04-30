import {useItem} from '../hooks/useItem.js';
import useForm from '../hooks/formHooks.js';
import Input from './ui/Input.jsx';
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
    console.log(inputs);
    const putResult = await putItem(inputs, props.selectedItem.itemId);
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
            defaultValue={props.selectedItem.itemName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="addPrice">Hinta</label>
          <Input
            name="price"
            type="text"
            id="addPrice"
            defaultValue={props.selectedItem.price}
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
