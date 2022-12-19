import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import moment from "moment/moment";

const UserForm = ({ operation, initialUser, loadUsers, handleClose }) => {
  const [user, setUser] = useState({
    details: "",
    start: "",
    end: "",
    status: "",
    assignee: "",
  });

  useEffect(() => {
    if (initialUser) setUser({ ...initialUser });
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const formatedValue = moment(value).format("YYYY-MM-DD");
    setUser({ ...user, [name]: formatedValue });
  };
  const resetUser = () => {
    setUser({
      details: "",
      start: "",
      end: "",
      status: "",
      assignee: "",
    });
  };

  const handleSubmit = () => {
    console.log("handleSubmit");
    if (operation == "edit") {
      axios
        .put(`http://localhost:8888/users/${user.id}`, user)
        .then((response) => {
          alert("User updated");
          loadUsers();
          handleClose();
        })
        .catch((err) => {
          alert("Could not updated");
          console.log(err);
        });
    } else {
      axios
        .post(`http://localhost:8888/users/`, user)
        .then((response) => {
          alert("User created");
          loadUsers();
          resetUser();
          handleClose();
        })
        .catch((err) => {
          alert("Could not Created");
          console.log(err);
        });
    }
  };

  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Task Details"
          name="details"
          value={user?.details}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <TextField
          sx={{
            width: { xs: 180, md: 270 },
          }}
          id="date"
          label="start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          name="start"
          value={user?.start}
          onChange={handleDateChange}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <TextField
          sx={{
            width: { xs: 185, md: 268 },
          }}
          id="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          name="end"
          label="End Date"
          value={user?.end}
          onChange={handleDateChange}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            value={user?.status}
            name="status"
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={10}>Open</MenuItem>
            <MenuItem value={20}>Pending</MenuItem>
            <MenuItem value={30}>Done</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Assignee"
          name="assignee"
          value={user?.assignee}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          {operation == "edit" ? "Update" : "Create"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserForm;
