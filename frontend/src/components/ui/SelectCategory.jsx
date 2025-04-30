import {useEffect, useState} from 'react';
import {useItem} from '../../hooks/useItem.js';

export default function SelectCategory(props) {
  const {getCategories} = useItem();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      setCategories(categories.data);
      console.log(categories);
    })();
  }, []);

  return (
    <>
      <label htmlFor="selectCategory">Kategoria</label>
      <select
        name="category"
        id="selectCategory"
        defaultValue=""
        onChange={props.onChange}
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
