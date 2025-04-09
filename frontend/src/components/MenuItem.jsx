import React from 'react';

export default function MenuItem(props) {
  return (
    <>
      <div>
        <p className="menu-item-name">{props.itemName}</p>
        <p className="menu-item-description">{props.description}</p>
      </div>
      <p className="menu-item-price">{props.price}€</p>
      <button className="menu-category-cart">Lisää koriin</button>
    </>
  );
}
