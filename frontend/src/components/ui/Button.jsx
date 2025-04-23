import './ui.css';

export default function Button(props) {
  // Props.color värit: "red", "yellow", "green"
  return (
    <button className={`ui-button ${props.color}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
