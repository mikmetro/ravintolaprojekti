import React from 'react';
import Button from './ui/Button';
import {useItem} from '../hooks/useItem.js';

export default function EditMenuItem(props) {
  const {deleteItem} = useItem();
  return (
    <>
      <div>
        <p className="menu-item-name">{props.itemName}</p>
        <p className="menu-item-description">{props.description}</p>
      </div>
      <p className="menu-item-price">{props.price}€</p>
      <div>
        <Button
          color="green"
          onClick={() => {
            props.setSelectedItem(props.itemId);
            props.setShowEdit(true);
          }}
        >
          Muokkaa
        </Button>
        <Button
          color="red"
          onClick={() => {
            deleteItem(props.id);
          }}
        >
          Poista
        </Button>
      </div>
    </>
  );
}
