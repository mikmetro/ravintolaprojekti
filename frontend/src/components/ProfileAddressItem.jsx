import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";

const AddressCard = ({
                       address,
                       isEditing,
                       isNew,
                       onChange,
                       onEdit,
                       onDelete,
                       onSave,
                       onCancel,
                       saving,
                     }) => {
  if (isEditing || isNew) {
    return (
      <div className="address-card">
        <p>Country</p>
        <Input
          name="country"
          value={address.country}
          onChange={(e) => onChange({ ...address, country: e.target.value })}
        />
        <p>City</p>
        <Input
          name="city"
          value={address.city}
          onChange={(e) => onChange({ ...address, city: e.target.value })}
        />
        <p>Postal Code</p>
        <Input
          name="postalcode"
          value={address.postalcode}
          onChange={(e) => onChange({ ...address, postalcode: e.target.value })}
        />
        <p>Street</p>
        <Input
          name="street"
          value={address.street}
          onChange={(e) => onChange({ ...address, street: e.target.value })}
        />
        <p>Door Code</p>
        <Input
          name="doorCode"
          value={address.doorCode}
          onChange={(e) => onChange({ ...address, doorCode: e.target.value })}
        />
        <div className="address-buttons">
          <Button disabled={saving} onClick={onSave}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
          <Button color="red" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="address-card">
      <div className="address-field">
        <strong>ID:</strong> {address.id}
      </div>
      <div className="address-field">
        <strong>Street:</strong> {address.street}
      </div>
      <div className="address-field">
        <strong>City:</strong> {address.city}
      </div>
      <div className="address-field">
        <strong>Country:</strong> {address.country}
      </div>
      <div className="address-field">
        <strong>Postal Code:</strong> {address.postalcode}
      </div>
      <div className="address-field">
        <strong>Door Code:</strong> {address.doorCode}
      </div>
      <div className="address-buttons">
        <Button color="black" onClick={onEdit}>
          Edit
        </Button>
        <Button color="red" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
