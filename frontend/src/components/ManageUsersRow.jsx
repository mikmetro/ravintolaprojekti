import AdminOrdersButton from './ui/AdminOrdersButton';
import {putUser, deleteUser} from '../hooks/useUser';
import './admin-modal.css';

export default function ManageUsersRow(props) {
  const {user} = props;

  const changeUserRole = async (id, newRole) => {
    const inputs = {
      role: newRole,
    };
    console.log(id);
    const putResult = await putUser(inputs, id);
    console.log(putResult);
    props.refreshUsers();
  };
  const removeUser = async (id) => {
    const delResult = await deleteUser(id);
    console.log(delResult);
    props.refreshUsers();
  };

  return (
    <tr className="manage-users-row-tr">
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="manage-users-row-role-td">
        <h3>{user.role}</h3>

        <AdminOrdersButton
          onClick={() => {
            const confirm = window.confirm(
              user.role == 'customer'
                ? `Haluatko varmasti antaa käyttäjälle ${user.name} admin oikeudet`
                : `Haluatko varmasti poistaa käyttäjältä ${user.name} admin oikeudet`
            );
            if (confirm) {
              changeUserRole(
                user.id,
                user.role == 'customer' ? 'admin' : 'customer'
              );
            }
          }}
          status={user.role == 'customer' ? 'complete' : 'cancel'}
        >
          {user.role == 'customer'
            ? 'Anna Admin oikeudet'
            : 'Poista Admin Oikeudet'}
        </AdminOrdersButton>
        <AdminOrdersButton
          onClick={() => {
            const confirm = window.confirm(
              `Haluatko varmasti poistaa käyttäjän ${user.name}`
            );
            if (confirm) {
              removeUser(user.id);
            }
          }}
          status={'cancel'}
        >
          Poista Käyttäjä
        </AdminOrdersButton>
      </td>
    </tr>
  );
}
