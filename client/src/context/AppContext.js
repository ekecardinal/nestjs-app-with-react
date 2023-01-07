import { createContext, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  if (message) {
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }

  const fetchUsers = async () => {
    await axios
      .get('api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const Search = async (query) => {
    await axios
      .post(`/api/users/search?key=${query}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const Delete = async (id) => {
    await axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        setUsers(users.filter((u) => u._id !== id));
        setMessage('Deleted Successfully');
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const Add = async (form, setForm) => {
    await axios
      .post('/api/users', form)
      .then((res) => {
        setUsers([...users, res.data]);
        setMessage('User Added Successfully');
        setErrors({});
        setOpen(!open);
        setForm({});
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };
  const FindOne = async (id) => {
    await axios
      .get(`/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };
  const Update = async (form, setForm, id) => {
    await axios
      .put(`/api/users/${id}`, form)
      .then((res) => {
        setMessage('User Updated Successfully');
        setErrors({});
        setOpen(!open);
        setForm({});
        fetchUsers();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };
  return (
    <AppContext.Provider
      value={{
        fetchUsers,
        Search,
        Delete,
        Add,
        FindOne,
        Update,
        users,
        user,
        setUsers,
        setOpen,
        open,
        errors,
        setErrors,
        message,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
