const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td><b>user&apos;s full name</b></td>
            <td><b>username</b></td>
            <td><b>blogs created</b></td>
          </tr>
          {users
            .map(user =>
              <tr key={user.id}>
                <td>
                  {user.name}
                </td>
                <td>
                  {user.username}
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users