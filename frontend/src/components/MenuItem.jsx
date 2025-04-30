import React from 'react';
import Button from './ui/Button';

export default function MenuItem(props) {
  return (
    <>
      <div>
        <p className="menu-item-name">{props.itemName}</p>
        <p className="menu-item-description">{props.description}</p>
      </div>
      <p className="menu-item-price">{props.price}€</p>
      <Button color="green" onClick={props.setSelectedItem}>
        Lisää koriin
      </Button>
    </>
  );
}
