import {useParams} from 'react-router-dom';
import {useOrder} from '../hooks/useOrder';
import {useEffect} from 'react';

export default function Order() {
  const searchParams = useParams();
  const {getOrder} = useOrder();

  useEffect(() => {
    (async () => {
      const x = await getOrder(searchParams.id);
      console.log(x);
    })();
  }, []);
}
