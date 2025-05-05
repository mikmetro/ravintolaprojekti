import {useEffect, useState} from 'react';
import {getUsers} from '../hooks/useUser';
import ManageUsersRow from '../components/ManageUsersRow';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const loadUserData = async () => {
    const userResult = await getUsers();
    const prio = {admin: 0, customer: 1};
    const sortedUsers = [...userResult].sort(
      (a, b) => prio[a.role] - prio[b.role]
    );

    console.log(sortedUsers);
    setUsers(sortedUsers);
  };
  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <>
      <section className="admin-orders-wrapper">
        <h1>Hallinnoi profiileja</h1>
        <table>
          <thead>
            <tr>
              <th>Nimi</th>
              <th>Sähköposti</th>
              <th>Rooli</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <ManageUsersRow
                  key={user.id}
                  user={user}
                  refreshUsers={loadUserData}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3">Ei profiileja</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
