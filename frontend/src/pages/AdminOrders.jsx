import {useEffect, useState} from 'react';
import {useOrder} from '../hooks/useOrder';
import AdminOrdersRow from '../components/AdminOrdersRow';
import '../css/admin-orders.css';

export default function AdminOrders() {
  const {getActiveOrders} = useOrder();
  const [ordersData, setOrdersData] = useState([]);

  const loadOrdersData = async () => {
    const ordersData = await getActiveOrders();

    const sortedOrders = [...ordersData.data].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    setOrdersData(sortedOrders);
  };
  useEffect(() => {
    loadOrdersData();
  }, []);

  return (
    <section className="admin-orders-wrapper">
      <h1>Aktiiviset tilaukset</h1>
      <table>
        <thead>
          <tr>
            <th>Asiakkaan tiedot</th>
            <th>Tuotteet</th>
            <th>Tila</th>
          </tr>
        </thead>
        <tbody>
          {ordersData && ordersData.length > 0 ? (
            ordersData.map((order) => (
              <AdminOrdersRow
                key={order.id}
                order={order}
                refreshOrders={loadOrdersData}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">Ei aktiivisia tilauksia</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
