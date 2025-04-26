import {useRef, useEffect, useState} from 'react';
import Spinner from './ui/Spinner';
import useSpinner from '../hooks/useSpinner.js';
import Button from './ui/Button';
import TextArea from './ui/TextArea';

const mockData = {
  name: 'Pepperoni',
  description: 'Pepperoni, punasipuli',
  price: 9.99,
};

export default function OrderItemModal(props) {
  const modalRef = useRef(null);
  const [extraInstructions, setExtraInstructions] = useState('');
  const [orderQuantity, incrementValue, decrementValue, resetValue] =
    useSpinner(1, 1, 99);

  useEffect(() => {
    if (props.selectedItem) {
      modalRef.current.showModal();
    }
  }, [props.selectedItem]);

  return (
    <dialog className="menu-order-modal" ref={modalRef} onClose={resetValue}>
      <h2>{mockData.name}</h2>
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
        <Button color="green">Lisää</Button>
      </section>
    </dialog>
  );
}
