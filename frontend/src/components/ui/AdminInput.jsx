export default function Input(props) {
  return (
    <input className="ui-input" type={props.type ?? 'text'} {...props}></input>
  );
}
