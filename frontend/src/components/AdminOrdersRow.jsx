import {useEffect, useState} from 'react';
import AdminOrdersButton from './ui/AdminOrdersButton';
import {useOrder} from '../hooks/useOrder';

export default function AdminOrdersRow(props) {
  const {order} = props;
  const {updateOrder} = useOrder();
  const [selectedStatus, setSelectedStatus] = useState();

  useEffect(() => {
    setSelectedStatus(order.status);
  }, []);

  const changeOrderStatus = async (id, newStatus) => {
    const inputs = {
      status: newStatus,
    };
    console.log(id);
    await updateOrder(inputs, id);
    props.refreshOrders();
  };
  const timeSinceOrder = () => {
    const now = new Date();
    const created = new Date(order.created_at);
    const diffMs = now - created;
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return 'juuri nyt';
    if (diffMinutes < 60) return `${diffMinutes} minuuttia sitten`;

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours} tuntia ${minutes} minuuttia sitten`;
  };

  return (
    <tr>
      <td>
        {order.customer_name} <br />
        {order.customer_phone} <br /> <br />
        {order.street}, {order.city} <br />
        {order.postalcode} <br />
        {order.door_code ? (
          <>
            Ovikoodi: {order.door_code} <br />{' '}
          </>
        ) : null}
        <br />
        Tilaus tehty: <br />
        {timeSinceOrder()} <br />
      </td>
      <td className="admin-orders-row-items">
        {order.items.map((item) => (
          <div key={item.order_item_id}>
            {item.name} x{item.quantity} @ €{item.item_price}
          </div>
        ))}
      </td>
      <td className="admin-orders-row-button-td">
        <h3>{order.type == 'pickup' ? 'Nouto' : 'Toimitus'}</h3>
        <div className="admin-orders-button-group status-buttons">
          <AdminOrdersButton
            onClick={() => {
              setSelectedStatus('pending');
              changeOrderStatus(order.id, 'pending');
            }}
            status={selectedStatus == 'pending' ? 'green' : 'red'}
          >
            Odottaa
          </AdminOrdersButton>
          <AdminOrdersButton
            onClick={() => {
              setSelectedStatus('paid');
              changeOrderStatus(order.id, 'paid');
            }}
            status={selectedStatus == 'paid' ? 'green' : 'red'}
          >
            Maksettu
          </AdminOrdersButton>
          <AdminOrdersButton
            onClick={() => {
              setSelectedStatus('preparing');
              changeOrderStatus(order.id, 'preparing');
            }}
            status={selectedStatus == 'preparing' ? 'green' : 'red'}
          >
            Valmistetaan
          </AdminOrdersButton>
          <AdminOrdersButton
            onClick={() => {
              setSelectedStatus('delivering');
              changeOrderStatus(order.id, 'delivering');
            }}
            status={selectedStatus == 'delivering' ? 'green' : 'red'}
          >
            {order.type == 'toimituksessa' ? 'Toimituksessa' : 'Nouto'}
          </AdminOrdersButton>
        </div>
        <div className="admin-orders-button-group action-buttons">
          <AdminOrdersButton
            onClick={() => {
              const confirm = window.confirm(
                'Oletko varma, että haluat merkitä tilauksen valmiiksi?'
              );
              if (confirm) {
                setSelectedStatus('completed');
                changeOrderStatus(order.id, 'completed');
              }
            }}
            status="complete"
          >
            Valmis
          </AdminOrdersButton>
          <AdminOrdersButton
            onClick={() => {
              const confirm = window.confirm(
                'Haluatko varmasti peruuttaa tämän tilauksen?'
              );
              if (confirm) {
                setSelectedStatus('cancelled');
                changeOrderStatus(order.id, 'cancelled');
              }
            }}
            status="cancel"
          >
            Peruuta tilaus
          </AdminOrdersButton>
        </div>
      </td>
    </tr>
  );
}
