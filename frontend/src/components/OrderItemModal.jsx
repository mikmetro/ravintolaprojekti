import React, {useRef, useEffect} from 'react';

const mockData = {
  name: 'Pepperoni',
  description: 'Pepperoni, punasipuli',
  price: 9.99,
};

export default function OrderItemModal(props) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (props.selectedItem) modalRef.current.showModal();
  }, [props]);

  return <dialog className="menu-order-modal" ref={modalRef}></dialog>;
}
