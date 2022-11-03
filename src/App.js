
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'

      },
      body: JSON.stringify(user)
    })

      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUser = [...users, data];
        setUsers(newUser);
      })
      .catch(err => console.log(err))
    event.target.reset();
  }

  return (
    <div className="App">
      <div className='p-4'>
        <form className='mt-4' onSubmit={handleAddUser}>
          <input type='text' name='name' placeholder='name' ></input>
          <br />
          <input type='email' name='email' placeholder='email' ></input>
          <br />
          <button type='submit'>Add User</button>
        </form>


        <h2>Users: {users.length}</h2>
        <div>
          {
            users.map(user => <p key={user.id}>{user.email}

            </p>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
