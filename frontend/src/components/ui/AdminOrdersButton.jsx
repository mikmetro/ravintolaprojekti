export default function EditMenuButton(props) {
  return (
    <button
      className={`admin-orders-button ${props.status}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
