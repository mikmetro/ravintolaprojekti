import React from 'react';
import EditMenuButton from './ui/EditMenuButton';
import {useItem} from '../hooks/useItem.js';

export default function EditMenuItem(props) {
  const {deleteItem, putItem} = useItem();
  const updateItemStatus = async (status) => {
    const inputs = {
      name: props.itemName,
      price: props.price,
      category: props.categoryId,
      description: props.description,
      status: status,
    };
    console.log(props.id);
    const putResult = await putItem(inputs, props.itemId);
    props.refreshMenu();
    console.log('putResult', putResult);
  };
  return (
    <>
      <div>
        <p
          className={
            props.status == 'inactive'
              ? 'edit-menu-item-name inactive'
              : 'edit-menu-item-name active'
          }
        >
          {props.itemName}
        </p>
        <p className="edit-menu-item-description">{props.description}</p>
      </div>
      <p className="edit-menu-item-price">{props.price}€</p>
      <div className="edit-menu-item-button-div">
        <div className="edit-menu-delete-edit">
          <EditMenuButton
            color="green"
            onClick={() => {
              props.setSelectedItem(props);
              props.setShowEdit(true);
            }}
          >
            Muokkaa
          </EditMenuButton>
          <EditMenuButton
            color="red"
            onClick={async () => {
              await deleteItem(props.itemId);
              props.refreshMenu();
            }}
          >
            Poista
          </EditMenuButton>
        </div>
        <div className="edit-menu-status">
          <p className="edit-menu-status-p">
            {props.status == 'inactive' ? 'Piilotettu' : 'Käytössä'}
          </p>
          {props.status == 'inactive' ? (
            <EditMenuButton
              color="green"
              onClick={() => {
                updateItemStatus('active');
              }}
            >
              {' '}
              Ota käyttöön
            </EditMenuButton>
          ) : (
            <EditMenuButton
              color="red"
              onClick={() => {
                updateItemStatus('inactive');
              }}
            >
              Piilota
            </EditMenuButton>
          )}
        </div>
      </div>
    </>
  );
}
