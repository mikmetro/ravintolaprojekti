import './ui.css';

export default function EditMenuButton(props) {
  // Props.color värit: "red", "yellow", "green"
  return (
    <button
      className={`ui-edit-menu-button ${props.color}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
