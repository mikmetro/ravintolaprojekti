import {useRef, useEffect, useState} from 'react';
import Spinner from './ui/Spinner';
import useSpinner from '../hooks/useSpinner.js';
import Button from './ui/Button';
import TextArea from './ui/TextArea';
import useCartContext from '../hooks/contextproviders/useCartContext.js';

export default function OrderItemModal({selectedItem, setSelectedItem}) {
  const modalRef = useRef(null);
  const [extraInstructions, setExtraInstructions] = useState('');
  const {setItem, cartItems} = useCartContext();
  const [orderQuantity, incrementValue, decrementValue] = useSpinner(
    cartItems[selectedItem.id]?.quantity ?? 1,
    0,
    99
  );

  useEffect(() => {
    if (selectedItem) {
      modalRef.current.showModal();
    }
  }, [selectedItem]);

  const handleAction = () => {
    setItem(selectedItem.id, orderQuantity);
    setSelectedItem(null);
  };
  const handleClose = () => setSelectedItem(null);
  const handleClick = (e) => e.target === e.currentTarget && handleClose();

  if (selectedItem)
    return (
      <dialog
        className="menu-order-modal"
        ref={modalRef}
        onClose={handleClose}
        onClick={handleClick}
      >
        <section className="menu-order-modal-spacer">
          <section className="menu-order-modal-details">
            <h2>
              {orderQuantity}x {selectedItem.name}
            </h2>
            <h3 className="menu-item-price">
              {(orderQuantity * +selectedItem.price).toFixed(2)}€
            </h3>
            <p className="menu-item-description">{selectedItem.description}</p>
          </section>
          <section className="menu-order-modal-options">
            <h3>Erityisohjeet</h3>
            <TextArea onChange={setExtraInstructions} />
          </section>
          <section className="menu-order-modal-action">
            <Spinner
              value={orderQuantity}
              incrementValue={incrementValue}
              decrementValue={decrementValue}
            />
            <Button
              color={`${orderQuantity ? 'green' : 'red'}`}
              onClick={handleAction}
            >
              {orderQuantity ? 'Lisää' : 'Poista'}
            </Button>
          </section>
        </section>
      </dialog>
    );
}
