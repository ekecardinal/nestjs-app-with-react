import * as React from 'react';
import { Box, Button, Drawer, Typography } from '@mui/material';

import { AppContext } from '../context/AppContext';
import CustomFormInput from './customInput';

export default function UserDrawer() {
  const { Add, setOpen, open, errors, user, Update } =
    React.useContext(AppContext);
  const [form, setForm] = React.useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Add(form, setForm);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    Update(form, setForm, form._id);
  };

  React.useEffect(() => {
    setForm(user);
  }, [user]);

  const list = () => (
    <Box
      sx={{
        width: 450,
        alignItems: 'center',
        p: 4,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 4 }}>
        Create User / Update User
      </Typography>
      <Box component="form" onSubmit={form._id ? handleUpdate : handleSubmit}>
        <CustomFormInput
          name="fullname"
          type="text"
          onChange={handleChange}
          errors={errors.fullname}
          value={form?.fullname}
          label={'Full Name'}
        />
        <CustomFormInput
          name="email"
          type="email"
          onChange={handleChange}
          errors={errors.email}
          value={form?.email}
          label={'Email'}
        />
        <CustomFormInput
          name="age"
          type="number"
          onChange={handleChange}
          errors={errors.age}
          value={form?.age}
          label={'Age'}
        />
        <CustomFormInput
          name="state"
          type="text"
          onChange={handleChange}
          errors={errors.state}
          value={form?.state}
          label={'State'}
        />
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{ p: 2, pl: 9, pr: 9, borderRadius: 6 }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={() => {
          setOpen(!open);
          setForm({});
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
}
