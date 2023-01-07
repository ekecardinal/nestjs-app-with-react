import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { Edit, DeleteForever } from '@mui/icons-material';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
    fontSize: 17,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.white,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function UserTable({ users }) {
  const { Delete, FindOne, setOpen, open } = useContext(AppContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Full Name</StyledTableCell>
            <StyledTableCell align="justify">Email</StyledTableCell>
            <StyledTableCell align="justify">Age</StyledTableCell>
            <StyledTableCell align="justify">state</StyledTableCell>
            <StyledTableCell align="justify">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell component="th" scope="row">
                {user.fullname}
              </StyledTableCell>
              <StyledTableCell align="justify">{user.email}</StyledTableCell>
              <StyledTableCell align="justify">{user.age}</StyledTableCell>
              <StyledTableCell align="justify">{user.state}</StyledTableCell>
              <StyledTableCell align="justify">
                <Box>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      setOpen(!open);
                      FindOne(user._id);
                    }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => Delete(user._id)}
                  >
                    <DeleteForever />
                  </Button>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
