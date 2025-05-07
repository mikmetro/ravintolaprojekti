import {useParams} from 'react-router-dom';
import {useOrder} from '../hooks/useOrder';
import {useEffect, useState} from 'react';
import {FaRegClock, FaTruck, FaCheck} from 'react-icons/fa6';
import {ImCross} from 'react-icons/im';
import {BsBoxArrowUpRight} from 'react-icons/bs';
import {TbPackageExport} from 'react-icons/tb';
import '../css/order.css';

export default function Order() {
  const searchParams = useParams();
  const {getOrder} = useOrder();
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const refreshOrderInfo = async () => {
      const orderInfo = await getOrder(searchParams.id);
      setOrderInfo(orderInfo.data);
    };

    refreshOrderInfo();
    const orderInfoInterval = setInterval(refreshOrderInfo, 5000);

    return () => {
      clearInterval(orderInfoInterval);
    };
  }, []);

  if (orderInfo)
    return (
      <section className="order-wrapper">
        <div className="order-status">
          {orderInfo.status === 'pending' || orderInfo.status === 'paid' ? (
            <>
              <BsBoxArrowUpRight className="order-status-icon" />
              <h1>Tilauksesi on lähetetty</h1>
            </>
          ) : orderInfo.status === 'preparing' ? (
            <>
              <FaRegClock className="order-status-icon" />
              <h1>Tilaustasi valmistellaan</h1>
            </>
          ) : orderInfo.status === 'delivering' ? (
            orderInfo.type === 'delivery' ? (
              <>
                <FaTruck className="order-status-icon" />
                <h1>Tilaustasi toimitetaan</h1>
              </>
            ) : (
              <>
                <TbPackageExport className="order-status-icon" />
                <h1>Tilauksesi on noudettavissa</h1>
              </>
            )
          ) : orderInfo.status === 'completed' ? (
            orderInfo.type === 'delivery' ? (
              <>
                <FaCheck className="order-status-icon" />
                <h1>Tilauksesi on toimitettu</h1>
              </>
            ) : (
              <>
                <FaCheck className="order-status-icon" />
                <h1>Tilauksesi on noudettu</h1>
              </>
            )
          ) : (
            <>
              <ImCross className="order-status-icon" />
              <h1>Tilauksesi on peruttu</h1>
            </>
          )}
        </div>
        <div className="order-information">
          <h2>Tilauksen tiedot</h2>
          <div className="order-information-items">
            {orderInfo.type === 'delivery' ? (
              <>
                <p className="order-information-item">
                  Osoite: {orderInfo.street}, {orderInfo.postalcode}{' '}
                  {orderInfo.city}
                </p>
                <p className="order-information-item">
                  Ovikoodi: {orderInfo.door_code}
                </p>
              </>
            ) : (
              <p></p>
            )}
            <p className="order-information-item">
              Aika: {new Date(orderInfo.created_at).toLocaleString()}
            </p>
            <p className="order-information-item">Tilaus nro: {orderInfo.id}</p>
          </div>
        </div>
        <div className="order-products">
          <h2>Tuotteet</h2>
          <div className="order-products-items">
            {orderInfo.items.map((item) => (
              <div className="order-products-item" key={item.order_item_id}>
                <p className="order-products-item-quantity">{item.quantity}x</p>
                <p className="order-products-item-name">{item.name}</p>
                <p className="order-products-item-price">{item.item_price}€</p>
              </div>
            ))}
          </div>
          <p className="order-products-total">Yhteensä: {orderInfo.total}€</p>
        </div>
      </section>
    );
}
