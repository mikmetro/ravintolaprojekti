import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';

export default function Spinner({value, incrementValue, decrementValue}) {
  return (
    <div className="ui-spinner">
      <button onClick={decrementValue}>
        <AiOutlineMinus />
      </button>
      <div>{value}</div>
      <button onClick={incrementValue}>
        <AiOutlinePlus />
      </button>
    </div>
  );
}
