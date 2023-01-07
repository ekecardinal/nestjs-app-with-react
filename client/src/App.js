import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import Table from './components/table';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from './context/AppContext';
import UserDrawer from './components/userDrawer';

function App() {
  const { fetchUsers, users, Search, open, setOpen, message, setErrors } =
    useContext(AppContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const SearchHandler = () => {
    Search(query);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 4,
        pl: { xs: 2, sm: 2, md: 6 },
        pr: { xs: 2, sm: 2, md: 6 },
      }}
    >
      <Box
        gap={2}
        sx={{ boxShadow: 2, p: 4, borderRadius: 4, display: 'flex' }}
      >
        <TextField
          fullWidth
          placeholder="search"
          value={query}
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          id="fullWidth"
        />
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          onClick={() => SearchHandler()}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          mt: 3,
          boxShadow: 2,
          p: 4,
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">List Users</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setErrors({});
            setOpen(!open);
          }}
        >
          Add User
        </Button>
      </Box>
      <Box mt={5}>
        <Table users={users} />
      </Box>
      <UserDrawer />
      {message && (
        <Snackbar
          open={message ? true : false}
          autoHideDuration={6000}
          // onClose={handleClose}
          message={message}
          // action={action}
        />
      )}
    </Container>
  );
}

export default App;
