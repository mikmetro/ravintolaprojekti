import {useEffect, useState} from 'react';
import {useItem} from '../../hooks/useItem.js';

export default function SelectCategory(props) {
  const {getCategories} = useItem();
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    (async () => {
      const categoriesResult = await getCategories();
      setCategories(categoriesResult.data);

      if (props.initialValue) {
        setSelectedValue(props.initialValue);
      }
    })();
  }, [props.initialValue]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    props.onChange(e); // forward the change to the parent
  };
  return (
    <>
      <label htmlFor="selectCategory">Kategoria</label>
      <select
        name="category"
        id="selectCategory"
        value={selectedValue}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Valitse kategoria
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
}
