import React, { useEffect, useState } from "react";
import axios from "axios";
import MuiDatatable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddEditUser from "./AddEditUser";
import { Button } from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [operation, setOperation] = useState("add");
  const [openDialog, setOpenDialog] = useState(false);
  const [initialUser, setInitialUser] = useState({
    details: "",
    start: "",
    end: "",
    status: "",
    assignee: "",
  });

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const loadUsers = () => {
    axios
      .get("http://localhost:8888/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = () => {
    setOperation("add");
    setInitialUser();
    setOpenDialog(true);
  };
  const editUser = (user) => {
    setOperation("edit");
    setInitialUser(user);
    setOpenDialog(true);
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8888/users/${id}`)
      .then((response) => {
        alert("User deleted");
        loadUsers();
      })
      .catch((err) => {
        alert("user not deleted");
        console.log(err);
      });
  };

  const columns = [
    {
      label: "ID",
      name: "id",
    },

    {
      label: "Task Detail",
      name: "details",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Start Date",
      name: "start",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "End Date",
      name: "end",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (index) => {
          const user = users[index];
          if (user?.status == 10) {
            let a = "open";
            return a;
          } else if (user?.status == 20) {
            let b = "pending";
            return b;
          } else {
            let c = "done";
            return c;
          }
        },
      },
    },
    {
      label: "Assignee",
      name: "assignee",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      label: "Action",
      name: "action",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (index) => {
          const user = users[index];
          return (
            <>
              <IconButton color="primary" onClick={() => editUser(user)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => deleteUser(user.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <AddEditUser
        open={openDialog}
        handleClose={handleDialogClose}
        operation={operation}
        initialUser={initialUser}
        loadUsers={loadUsers}
      />

      <Button variant="contained" color="primary" onClick={addUser}>
        ADD NEW+
      </Button>
      <MuiDatatable title="User List" columns={columns} data={users} />
    </>
  );
};

export default UserList;
