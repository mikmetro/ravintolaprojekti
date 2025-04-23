export default function Input({type}) {
  return <input className="ui-input" type={type ?? 'text'}></input>;
}
